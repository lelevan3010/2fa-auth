import axios from "axios";

let API_URL;
console.log(process.env.NODE_ENV)
switch (process.env.NODE_ENV) {
  case "production":
    API_URL = "https://know-your-plant-api.herokuapp.com";
    break;
  default:
    API_URL = "http://localhost:3001/";
}
console.log(API_URL)
export const customAxios = axios.create({
  baseURL: API_URL,
});

export const setAuthToken = (token: any) => {
  if (token) {
    customAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete customAxios.defaults.headers.common.Authorization;
  }
};
