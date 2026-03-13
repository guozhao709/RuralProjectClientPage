import request from "@/utils/request";

// 登录接口
export const login = (data: { phone: string, password: string }) : any => {
  return request.post("/user/auth/login", data);
}


