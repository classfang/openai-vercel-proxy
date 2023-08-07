## OpenAI Vercel Proxy 轻松免费部署你的OpenAI和TypeChat代理

### 快速开始

#### 0.注册Vercel

如果你没有Vercel账号，首先需要前往 https://vercel.com/ 免费注册一个账号。

#### 1.安装Vercel环境

```shell
npm i -g vercel
```

#### 2.拉取项目并本地测试

```shell
npm install
```

```shell
vercel dev --debug
```
首次使用Vercel需要登录，按照提示操作即可。

#### 3.部署到Vercel
```shell
vercel --prod
```

#### 4.代理接口说明
- 使用部署后返回的域名测试，建议绑定个人域名使用。

- 代理接口地址：https://openai-vercel-proxy-xxxx.vercel.app/api/openai/{openai接口路径}

- 例如： OpenAI官方Chat接口为 https://api.openai.com/v1/chat/completions 对应代理接口为 https://openai-vercel-proxy-xxxx.vercel.app/api/openai/v1/chat/completions`

- OpenAI接口文档：https://platform.openai.com/docs/api-reference/chat

#### 5.TypeChat接口
- 代理地址：https://openai-vercel-proxy-xxxx.vercel.app/api/typechat/translate
- 参数说明：`apiKey`OpenAi的ApiKey，`model`gpt版本，`schema`schema.ts字符串，`prompt`用户输入

请求示例：
```json
{
    "apiKey": "xxx",
    "model": "gpt-3.5-turbo",
    "schema": "// This is a schema for writing programs that evaluate expressions.\n\nexport type API = {\n    // Add two numbers\n    add(x: number, y: number): number;\n    // Subtract two numbers\n    sub(x: number, y: number): number;\n    // Multiply two numbers\n    mul(x: number, y: number): number;\n    // Divide two numbers\n    div(x: number, y: number): number;\n    // Negate a number\n    neg(x: number): number;\n    // Identity function\n    id(x: number): number;\n    // Unknown request\n    unknown(text: string): number;\n}",
    "prompt": "1 + 2"
}
```
响应示例：
```json
{
    "code": 200,
    "msg": {
        "@steps": [
            {
                "@func": "add",
                "@args": [
                    1,
                    2
                ]
            }
        ]
    }
}
```