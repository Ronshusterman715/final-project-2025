import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { errorMessage } from "../utils/ui/alert";
import { clearAuth, saveUser } from "../utils/storage";

export function decodeToken(token: string | null) {
  const [decodedToken, setDecodedToken] = useState<any | null>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!token) {
      setDecodedToken(null);
      setError(null);
      clearAuth();
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const rememberMe = localStorage.getItem("token") !== null;
      saveUser(decodedToken, rememberMe);
      setDecodedToken(decodedToken);
      setError(null);
    } catch (error) {
      console.log(error);
      clearAuth();
      setError(error);
      errorMessage("Invalid token");
    }
  }, [token]);

  return { decodedToken, error };
}
