import type { User } from "../interfaces/users/User";
import axiosInstance from "../utils/interceptors/axios-interceptor";

//Create user
export async function registerUser(normalizedUser: User) {
  return await axiosInstance.post("/users/register", normalizedUser);
}

//Get user by id
export function getUserById(id: string) {
  return axiosInstance.get(`/users/${id}`);
}
