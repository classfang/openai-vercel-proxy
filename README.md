## OpenAI Vercel Proxy 轻松免费部署你的OpenAI代理

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