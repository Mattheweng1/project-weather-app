import {
  fetchData,
  filterForecastData,
  getForecastUrlFromInput,
} from "./weatherData";
import { renderWeather } from "./renderWeather";
import { currentSlide, plusSlide } from "./hourlySlides";
import { changeUnits } from "./units";
import {
  displayContent,
  hideError,
  showEmptyInputError,
  showSameInputError,
} from "./animate";

// Initial weather data
// Also store current forecastUrl & weather data for reuse
let forecastUrl =
  "https://api.weatherapi.com/v1/forecast.json?key=290bb3875a474307b09152332230911&q=Nowhere&days=3&aqi=no&alerts=no";
let weatherPromise = fetchData(forecastUrl)
  .then(filterForecastData)
  .catch(console.error);

// Initial weather render
weatherPromise.then(renderWeather).then(displayContent).catch(console.error);
weatherPromise.then(console.log);

// onsubmit: Fetch & render weather data
const locationSearchForm = document.getElementById("locationSearchForm");
const searchInput = document.querySelector(".searchBar input");

locationSearchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  hideError();
  // Prevent fetching & rerendering the same or no data
  if (!searchInput.value) {
    showEmptyInputError();
  } else if (forecastUrl === getForecastUrlFromInput()) {
    showSameInputError();
  } else {
    forecastUrl = getForecastUrlFromInput();
    weatherPromise = fetchData(forecastUrl)
      .then(filterForecastData)
      .catch(console.error);
    weatherPromise.then(renderWeather).catch(console.error);
  }
  locationSearchForm.reset();
});

// onclick: Change hourlyWeather slide
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

// onclick: Change units
const unitCSpan = document.querySelector(".changeUnits .unitC");
const unitFSpan = document.querySelector(".changeUnits .unitF");

unitCSpan.addEventListener("click", () => {
  changeUnits("metric");
});
unitFSpan.addEventListener("click", () => {
  changeUnits("imperial");
});
