import axios from "axios";
import { API_KEY, URL } from "../const/Constant";

const weatherAPI = {
  getWeatherByCity,
};
function getWeatherByCity(city) {
  return axios.get(`${URL.WEATHER}?q=${city}&appid=${API_KEY}`);
}

export default weatherAPI;
