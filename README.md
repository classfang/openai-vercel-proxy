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

5.1 程序转换代理地址：https://openai-vercel-proxy-xxxx.vercel.app/api/typechat/translate/program

参数说明：`apiKey`OpenAi的ApiKey，`model`gpt版本，`schema`schema.ts字符串，`prompt`用户输入

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

5.2 JSON转换代理地址：https://openai-vercel-proxy-xxxx.vercel.app/api/typechat/translate/json

参数说明：`apiKey`OpenAi的ApiKey，`model`gpt版本，`schema`schema.ts字符串，`prompt`用户输入，`type`转换的JSON对象类型

请求示例：
```json
{
  "apiKey": "xxx",
  "model": "gpt-3.5-turbo",
  "schema": "// The following types define the structure of an object of type CalendarActions that represents a list of requested calendar actions\n\nexport type CalendarActions = {\n    actions: Action[];\n};\n\nexport type Action =\n    | AddEventAction\n    | RemoveEventAction\n    | AddParticipantsAction\n    | ChangeTimeRangeAction\n    | ChangeDescriptionAction\n    | FindEventsAction\n    | UnknownAction;\n\nexport type AddEventAction = {\n    actionType: 'add event';\n    event: Event;\n};\n\nexport type RemoveEventAction = {\n    actionType: 'remove event';\n    eventReference: EventReference;\n};\n\nexport type AddParticipantsAction = {\n    actionType: 'add participants';\n    // event to be augmented; if not specified assume last event discussed\n    eventReference?: EventReference;\n    // new participants (one or more)\n    participants: string[];\n};\n\nexport type ChangeTimeRangeAction = {\n    actionType: 'change time range';\n    // event to be changed\n    eventReference?: EventReference;\n    // new time range for the event\n    timeRange: EventTimeRange;\n};\n\nexport type ChangeDescriptionAction = {\n    actionType: 'change description';\n    // event to be changed\n    eventReference?: EventReference;\n    // new description for the event\n    description: string;\n};\n\nexport type FindEventsAction = {\n    actionType: 'find events';\n    // one or more event properties to use to search for matching events\n    eventReference: EventReference;\n};\n\n// if the user types text that can not easily be understood as a calendar action, this action is used\nexport interface UnknownAction {\n    actionType: 'unknown';\n    // text typed by the user that the system did not understand\n    text: string;\n}\n\nexport type EventTimeRange = {\n    startTime?: string;\n    endTime?: string;\n    duration?: string;\n};\n\nexport type Event = {\n    // date (example: March 22, 2024) or relative date (example: after EventReference)\n    day: string;\n    timeRange: EventTimeRange;\n    description: string;\n    location?: string;\n    // a list of people or named groups like 'team'\n    participants?: string[];\n};\n\n// properties used by the requester in referring to an event\n// these properties are only specified if given directly by the requester\nexport type EventReference = {\n    // date (example: March 22, 2024) or relative date (example: after EventReference)\n    day?: string;\n    // (examples: this month, this week, in the next two days)\n    dayRange?: string;\n    timeRange?: EventTimeRange;\n    description?: string;\n    location?: string;\n    participants?: string[];\n};",
  "prompt": "I need to get my tires changed from 12:00 to 2:00 pm on Friday March 15, 2024",
  "type": "CalendarActions"
}
```
响应示例：
```json
{
  "code": 200,
  "msg": "转换成功",
  "data": {
    "actions": [
      {
        "actionType": "add event",
        "event": {
          "day": "Friday March 15, 2024",
          "timeRange": {
            "startTime": "12:00 pm",
            "endTime": "2:00 pm"
          },
          "description": "get my tires changed"
        }
      }
    ]
  }
}
```