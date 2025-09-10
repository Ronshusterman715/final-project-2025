const BASE_URL_API: string = import.meta.env.VITE_BASE_URL_API;

export const buildCompleteUrl = (imagePathFromDB: string): string => {
  if (imagePathFromDB.startsWith("http")) {
    return imagePathFromDB;
  }

  return `${BASE_URL_API}${imagePathFromDB}`;
};
