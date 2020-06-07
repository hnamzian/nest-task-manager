import { createParamDecorator } from "@nestjs/common"

export const GetUser = createParamDecorator((data, req) => {
  console.log(data, req);
  return req.args[0].user
}) 