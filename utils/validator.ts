import {NextApiResponse} from "next";

export function isNotNull(pram: string, response: NextApiResponse) {
  if (!pram) {
    response.status(200).json({
      code: 402,
      msg: '参数不能为空',
    });
    return false
  }
  return true
}
