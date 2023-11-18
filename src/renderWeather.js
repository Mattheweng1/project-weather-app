import { addDays, fromUnixTime } from "date-fns";
import { format, utcToZonedTime } from "date-fns-tz";
import { renderUnits } from "./units";
import { currentSlide } from "./hourlySlides";
import { animateFadeInSlide } from "./animate";

function renderWeather(weather) {
  if (weather) {
    renderCurrentWeather(weather);
    renderNextDaysWeather(weather);
    renderHourlyWeather(weather);
    currentSlide(1);
    renderUnits();
    animateFadeInSlide();
  }
}

function renderCurrentWeather(weather) {
  const conditionTextDiv = document.querySelector(
    ".currentWeather .conditionText"
  );
  const locationNameDiv = document.querySelector(
    ".currentWeather .locationName"
  );
  const localDateDiv = document.querySelector(".currentWeather .localDate");
  const localTimeDiv = document.querySelector(".currentWeather .localTime");
  const metricTempSpan = document.querySelector(
    ".currentWeather .temp .metric"
  );
  const imperialTempSpan = document.querySelector(
    ".currentWeather .temp .imperial"
  );
  const conditionIconImg = document.querySelector(
    ".currentWeather .conditionIcon"
  );
  const metricFeelsLikeSpan = document.querySelector(
    ".currentWeather .feelsLike .metric"
  );
  const imperialFeelsLikeSpan = document.querySelector(
    ".currentWeather .feelsLike .imperial"
  );
  const humidityDiv = document.querySelector(".currentWeather .humidity");
  const chanceOfRainDiv = document.querySelector(
    ".currentWeather .chanceOfRain"
  );
  const metricWindSpeedSpan = document.querySelector(
    ".currentWeather .windSpeed .metric"
  );
  const imperialWindSpeedSpan = document.querySelector(
    ".currentWeather .windSpeed .imperial"
  );

  conditionTextDiv.textContent = weather.current.text;
  if (
    weather.location.name !== weather.location.region &&
    weather.location.region
  ) {
    locationNameDiv.textContent =
      weather.location.name + ", " + weather.location.region;
  } else {
    locationNameDiv.textContent =
      weather.location.name + ", " + weather.location.country;
  }
  localDateDiv.textContent = format(
    utcToZonedTime(
      fromUnixTime(weather.location.localtime_epoch),
      weather.location.tz_id
    ),
    "EEEE, do MMM yyyy"
  );
  localTimeDiv.textContent = format(
    utcToZonedTime(
      fromUnixTime(weather.location.localtime_epoch),
      weather.location.tz_id
    ),
    "h:mm aaa"
  );
  metricTempSpan.textContent = weather.current.temp_c + " °C";
  imperialTempSpan.textContent = weather.current.temp_f + " °F";
  conditionIconImg.src = weather.current.icon;
  metricFeelsLikeSpan.textContent = weather.current.feelslike_c + " °C";
  imperialFeelsLikeSpan.textContent = weather.current.feelslike_f + " °F";
  humidityDiv.textContent = weather.current.humidity + " %";
  chanceOfRainDiv.textContent = weather.current.chance_of_rain + " %";
  metricWindSpeedSpan.textContent = weather.current.wind_kph + " kph";
  imperialWindSpeedSpan.textContent = weather.current.wind_mph + " mph";
}

function renderNextDaysWeather(weather) {
  const nextDaysWeatherDivs = [
    ...document.querySelectorAll(".nextDaysWeather"),
  ];

  nextDaysWeatherDivs.forEach((div) => {
    const divIndex = nextDaysWeatherDivs.indexOf(div);

    const dayOfWeekDiv = div.querySelector(".dayOfWeek");
    const metricTempHighSpan = div.querySelector(".tempHigh .metric");
    const imperialTempHighSpan = div.querySelector(".tempHigh .imperial");
    const metricTempLowSpan = div.querySelector(".tempLow .metric");
    const imperialTempLowSpan = div.querySelector(".tempLow .imperial");
    const conditionIconImg = div.querySelector(".conditionIcon");

    dayOfWeekDiv.textContent = format(
      addDays(
        utcToZonedTime(
          fromUnixTime(weather.location.localtime_epoch),
          weather.location.tz_id
        ),
        divIndex + 1
      ),
      "EEEE"
    );
    metricTempHighSpan.textContent =
      weather.nextDays[divIndex].maxtemp_c + " °C";
    imperialTempHighSpan.textContent =
      weather.nextDays[divIndex].maxtemp_f + " °F";
    metricTempLowSpan.textContent =
      weather.nextDays[divIndex].mintemp_c + " °C";
    imperialTempLowSpan.textContent =
      weather.nextDays[divIndex].mintemp_f + " °F";
    conditionIconImg.src = weather.nextDays[divIndex].icon;
  });
}

function renderHourlyWeather(weather) {
  const hourlySlides = [...document.getElementsByClassName("slide")];
  const slide1 = hourlySlides[0];
  const slide2 = hourlySlides[1];
  const slide3 = hourlySlides[2];

  // Remove all children of slides
  hourlySlides.forEach((slide) => {
    removeAllChildNodes(slide);
  });

  // Render each slide with 8 hours
  for (let i = 0; i < 8; i++) {
    renderOneHourWeather(weather, slide1, i);
  }
  for (let i = 8; i < 16; i++) {
    renderOneHourWeather(weather, slide2, i);
  }
  for (let i = 16; i < 24; i++) {
    renderOneHourWeather(weather, slide3, i);
  }
}

function renderOneHourWeather(weather, slide, index) {
  const timeDiv = document.createElement("div");
  const tempDiv = document.createElement("div");
  tempDiv.classList.add("unitContainer");
  const metricTempSpan = document.createElement("span");
  metricTempSpan.classList.add("metric");
  tempDiv.appendChild(metricTempSpan);
  const imperialTempSpan = document.createElement("span");
  imperialTempSpan.classList.add("imperial");
  imperialTempSpan.classList.add("displayNone");
  tempDiv.appendChild(imperialTempSpan);
  const conditionIconImg = document.createElement("img");

  timeDiv.textContent = format(
    utcToZonedTime(
      fromUnixTime(weather.next24Hours[index].time_epoch),
      weather.location.tz_id
    ),
    "h aaa"
  );
  metricTempSpan.textContent = weather.next24Hours[index].temp_c + " °C";
  imperialTempSpan.textContent = weather.next24Hours[index].temp_f + " °F";
  conditionIconImg.src = weather.next24Hours[index].icon;

  const hourWeatherDiv = document.createElement("div");
  hourWeatherDiv.classList.add("oneHourWeather");

  hourWeatherDiv.appendChild(timeDiv);
  hourWeatherDiv.appendChild(tempDiv);
  hourWeatherDiv.appendChild(conditionIconImg);

  slide.appendChild(hourWeatherDiv);
}

const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

export { renderWeather };
