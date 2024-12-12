import { cloneDeep } from "lodash";

export const isDevEnv = () => process.env.REACT_APP_ENV === "dev";

export const getImageLink = (imageUrl: string) => {
  return isDevEnv()
    ? `http://localhost:8000/movies/uploads/${imageUrl}`
    : `https://www.manoskarystinos.com/movies/uploads/${imageUrl}`;
};

export function deepCloneObject(object: any): any {
  return cloneDeep(object);
}
