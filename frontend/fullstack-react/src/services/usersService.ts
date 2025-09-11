import type { User } from "../interfaces/users/User";
import axiosInstance from "../utils/interceptors/axios-interceptor";

//Create user
export async function registerUser(normalizedUser: User) {
  return await axiosInstance.post("/users/register", normalizedUser);
}
