import {NextApiRequest, NextApiResponse} from 'next'
import {
    createJsonTranslator,
    createOpenAILanguageModel
} from 'typechat'
import {isNotNull} from '@/utils/validator'

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse,
) {
    // 用户请求
    const apiKey = request.body.apiKey
    const model = request.body.model
    const schema = request.body.schema
    const prompt = request.body.prompt
    const type = request.body.type
    if (!isNotNull(apiKey, response) || !isNotNull(model, response) || !isNotNull(schema, response) || !isNotNull(prompt, response) || !isNotNull(type, response)) {
        return
    }

    // 大语言模型
    const languageModel = createOpenAILanguageModel(apiKey, model)

    // 转换器：自然语言请求转换为JSON
    const translator = createJsonTranslator(languageModel, schema, type)

    // 转换用户输入，获取执行程序
    const translateResult = await translator.translate(prompt)
    if (!translateResult.success) {
        console.error(translateResult.message)
        response.status(200).json({
            code: 402,
            msg: translateResult.message,
        })
        return
    }

    response.status(200).json({
        code: 200,
        msg: '转换成功',
        data: translateResult.data
    })
}