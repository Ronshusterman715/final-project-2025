import { jwtDecode } from "jwt-decode";

export function decodeToken() {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return null;
  }

  try {
    return jwtDecode(token);
  } catch (error) {
    console.log(error);
    sessionStorage.removeItem("token");
    return null;
  }
}
