import axiosInstance from "../utils/interceptors/axios-interceptor"

//Login user
export async Function loginUser(auth: Auth) {
    return await axiosInstance.post("/users/login", auth)
};