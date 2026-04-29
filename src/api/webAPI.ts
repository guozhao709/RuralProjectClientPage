import request from "@/utils/request";

// 登录接口
export const login = (data: { phone: string, password: string }) : any => {
  return request.post("/user/auth/login", data);
}

// 注册接口
export const register = (data: { phone: string, password: string, name: string, gender: number, birthday: string, address: string }) : any => {
  return request.post("/user/auth/register", data);
}

// 判断token是否过期
export const checkToken = () : Promise<{success: boolean, message: string}> => {
  return request.get("/user/auth/checkToken");
}

