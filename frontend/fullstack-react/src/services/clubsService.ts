import type { Club } from "../interfaces/clubs/Club";
import axiosInstance from "../utils/interceptors/axios-interceptor";

//Get All Clubs
export async function getAllClubs() {
  return await axiosInstance.get("/clubs");
}
//Get club by id
export function getClubById(id: string) {
  return axiosInstance.get(`/clubs/${id}`);
}

//Create club
export async function createClub(club: Club) {
  return await axiosInstance.post("/clubs", club);
}

//Update club
export async function updateClub(id: string, club: Club) {
  return await axiosInstance.put(`/clubs/${id}`, club);
}

//Delete club
export async function deleteClub(id: string) {
  return await axiosInstance.delete(`/clubs/${id}`);
}

//Like/unlike club
export async function likeUnlikeClub(id: string) {
  return await axiosInstance.patch(`/clubs/${id}`);
}

//Get favorite clubs
export async function getFavoriteClubs() {
  return await axiosInstance.get("/clubs/favorites");
}
