import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'
import {prettyObject} from '@/utils/format'

export const config = {
    runtime: 'edge',
}

export default async function handler(
    req: NextRequest
) {
    try {
        return await requestOpenai(req) 
    } catch (e) {
        console.error('[OpenAI] ', e)
        return NextResponse.json(prettyObject(e))
    }
}

async function requestOpenai(req: NextRequest) {
    const controller = new AbortController()
    const authValue = req.headers.get('Authorization') ?? ''
    const openaiPath = `${req.nextUrl.pathname}${req.nextUrl.search}`.replaceAll(
        '/api/openai/',
        '',
    )

    let baseUrl = 'https://api.openai.com'

    console.log('[Proxy] ', openaiPath)
    console.log('[Base Url]', baseUrl)

    const timeoutId = setTimeout(() => {
        controller.abort()
    }, 10 * 60 * 1000)

    const fetchUrl = `${baseUrl}/${openaiPath}`
    const fetchOptions: RequestInit = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authValue
        },
        cache: 'no-store',
        method: req.method,
        body: req.body,
        signal: controller.signal,
    }

    try {
        const res = await fetch(fetchUrl, fetchOptions)

        const newHeaders = new Headers(res.headers)
        newHeaders.delete('www-authenticate')
        newHeaders.set('X-Accel-Buffering', 'no')

        return new Response(res.body, {
            status: res.status,
            statusText: res.statusText,
            headers: newHeaders,
        })
    } finally {
        clearTimeout(timeoutId)
    }
}