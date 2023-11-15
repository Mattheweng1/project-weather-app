import { fromUnixTime } from "date-fns";
import { format, utcToZonedTime } from "date-fns-tz";
import { fetchData, filterForecastData } from "./api";
import {
  renderCurrentWeather,
  renderHourlyWeather,
  renderNextDayWeather,
  renderNextDayWeather2,
} from "./render";

/* renderCurrentWeather(weatherData); */

let weatherPromise = fetchData(getForecastUrl("tokyo")).then(
  filterForecastData
);

fetchData(getForecastUrl("tokyo")).then(console.log);

weatherPromise.then(console.log);

weatherPromise.then(renderCurrentWeather);
weatherPromise.then(renderNextDayWeather);
weatherPromise.then(renderNextDayWeather2);
weatherPromise.then(renderHourlyWeather);

weatherPromise.then((weather) => {
  console.log(
    format(
      utcToZonedTime(
        fromUnixTime(weather.location.localtime_epoch),
        weather.location.tz_id
      ),
      "h aaa"
    )
  );
});

/* fetchData(getSearchUrl()).then(console.log); */

function getForecastUrl(locationInput) {
  return `https://api.weatherapi.com/v1/forecast.json?key=290bb3875a474307b09152332230911&q=${locationInput}&days=3&aqi=no&alerts=no`;
}

function getSearchUrl() {
  return "https://api.weatherapi.com/v1/search.json?key=290bb3875a474307b09152332230911&q=Hokkaido";
}