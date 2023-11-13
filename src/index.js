import { fetchData, filterForecastData } from "./apiFunctions";

/* fetchData(getForecastUrl()).then(console.log);

fetchData(getForecastUrl()).then(filterForecastData).then(console.log); */

/* fetchData(getSearchUrl()).then(console.log); */

function getForecastUrl() {
  return "https://api.weatherapi.com/v1/forecast.json?key=290bb3875a474307b09152332230911&q=Hokkaido&days=3&aqi=no&alerts=no";
}

function getSearchUrl() {
  return "https://api.weatherapi.com/v1/search.json?key=290bb3875a474307b09152332230911&q=Hokkaido";
}
