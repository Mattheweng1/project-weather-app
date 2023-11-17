import { fetchData, filterForecastData } from "./api";
import { renderWeather } from "./renderWeather";
import { currentSlide, plusSlide } from "./hourlySlides";
import { changeUnits } from "./units";

// Initial weather data
// Also store current forecastUrl & weather data for reuse
let forecastUrl =
  "https://api.weatherapi.com/v1/forecast.json?key=290bb3875a474307b09152332230911&q=Nowhere&days=3&aqi=no&alerts=no";
let weatherPromise = fetchData(forecastUrl).then(filterForecastData);

// Initial weather render
weatherPromise.then(renderWeather);
weatherPromise.then(console.log);

// onsubmit: Fetch & render weather data
const locationSearchForm = document.getElementById("locationSearchForm");
locationSearchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Prevent fetching & rerendering the same data
  if (forecastUrl !== getForecastUrl()) {
    forecastUrl = getForecastUrl();
    weatherPromise = fetchData(forecastUrl).then(filterForecastData);
    weatherPromise.then(renderWeather);
  }
});

function getForecastUrl() {
  const searchInput = document.querySelector(".searchBar input");
  return `https://api.weatherapi.com/v1/forecast.json?key=290bb3875a474307b09152332230911&q=${searchInput.value}&days=3&aqi=no&alerts=no`;
}

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
