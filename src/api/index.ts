import axios from "axios";

export const countryApi = axios.create({
  baseURL: "https://689de04dce755fe6978a5819.mockapi.io/country",
});

export const phoneApi = axios.create({
  baseURL: "https://689dd9aece755fe6978a3ea9.mockapi.io/phones",
});
