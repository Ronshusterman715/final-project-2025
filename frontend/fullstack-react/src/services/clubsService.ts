import type { Club } from "../interfaces/clubs/Club";
import axiosInstance from "../utils/interceptors/axios-interceptor";

//Get All Clubs
export async function getAllClubs() {
  return await axiosInstance.get("/clubs");
}

//Create club
export async function createClub(club: Club) {
  return await axiosInstance.post("/clubs", club);
}
