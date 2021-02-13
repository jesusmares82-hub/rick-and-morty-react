import axios from "axios";

export const LocationContainer = (query) => {
  const URL = `https://rickandmortyapi.com/api/location/${query}`;
  const res = axios(URL);
  return res;
};
