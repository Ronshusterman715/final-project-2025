import type { Auth } from "../interfaces/Auth/Auth";
import axiosInstance from "../utils/interceptors/axios-interceptor";

//Login user
export async function loginUser(auth: Auth) {
  return await axiosInstance.post("/users/login", auth);
}
