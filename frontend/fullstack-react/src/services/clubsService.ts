import axiosInstance from "../utils/interceptors/axios-interceptor";

//Get All Clubs
export async function getAllClubs() {
  return await axiosInstance.get("/clubs");
}
