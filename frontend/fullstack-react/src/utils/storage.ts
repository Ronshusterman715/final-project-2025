export const saveToken = (token: string, rememberMe: boolean) => {
  if (rememberMe) {
    localStorage.setItem("token", token);
    sessionStorage.removeItem("token");
  } else {
    sessionStorage.setItem("token", token);
    localStorage.removeItem("token");
  }
};

export const saveUser = (user: any, rememberMe: boolean) => {
  const userString = JSON.stringify(user);
  if (rememberMe) {
    localStorage.setItem("user", userString);
    sessionStorage.removeItem("user");
  } else {
    sessionStorage.setItem("user", userString);
    localStorage.removeItem("user");
  }
};

export const getToken = (): string | null => {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
};

export const getUser = (): any => {
  const userString =
    localStorage.getItem("user") || sessionStorage.getItem("user");
  return userString ? JSON.parse(userString) : null;
};

export const clearAuth = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  localStorage.removeItem("user");
  sessionStorage.removeItem("user");
};
