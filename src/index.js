import { fromUnixTime } from "date-fns";
import { format, utcToZonedTime } from "date-fns-tz";
import { fetchData, filterForecastData } from "./api";
import { renderWeather } from "./render";
import { currentSlide, plusSlide } from "./hourlySlides";
import { changeUnits } from "./units";

let weatherPromise = fetchData(getForecastUrl("tokyo")).then(
  filterForecastData
);

fetchData(getForecastUrl("tokyo")).then(console.log);

weatherPromise.then(console.log);

weatherPromise.then(renderWeather);

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

// Change hourlySlides onclick

const leftArrow = document.querySelector(".leftArrow");
const rightArrow = document.querySelector(".rightArrow");
const dots = [...document.getElementsByClassName("dot")];

leftArrow.addEventListener("click", () => {
  plusSlide(-1);
});
rightArrow.addEventListener("click", () => {
  plusSlide(1);
});
dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    currentSlide(dots.indexOf(dot) + 1);
  });
});

// Change units onclick

const unitCSpan = document.querySelector(".changeUnits .unitC");
const unitFSpan = document.querySelector(".changeUnits .unitF");

unitCSpan.addEventListener("click", () => {
  changeUnits("metric");
});
unitFSpan.addEventListener("click", () => {
  changeUnits("imperial");
});
