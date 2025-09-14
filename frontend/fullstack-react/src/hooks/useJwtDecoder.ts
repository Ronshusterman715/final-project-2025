import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { errorMessage } from "../utils/ui/alert";

export function decodeToken(token: string | null) {
  const [decodedToken, setDecodedToken] = useState<any | null>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      setError("No token found");
      errorMessage("Please login");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      sessionStorage.setItem("user", JSON.stringify(decodedToken));
      setDecodedToken(decodedToken);
      setError(null);
    } catch (error) {
      console.log(error);
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      setError(error);
      errorMessage("Invalid token");
    }
  }, [token]);

  return { decodedToken, error };
}
