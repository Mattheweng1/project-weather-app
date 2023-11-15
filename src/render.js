import { addDays, fromUnixTime, getDay } from "date-fns";
import { format, utcToZonedTime } from "date-fns-tz";

function renderCurrentWeather(weather) {
  const conditionTextDiv = document.querySelector(
    ".currentWeather .conditionText"
  );
  const locationNameDiv = document.querySelector(
    ".currentWeather .locationName"
  );
  const localDateDiv = document.querySelector(".currentWeather .localDate");
  const localTimeDiv = document.querySelector(".currentWeather .localTime");
  const tempDiv = document.querySelector(".currentWeather .temp");
  const conditionIconImg = document.querySelector(
    ".currentWeather .conditionIcon"
  );
  const feelsLikeDiv = document.querySelector(".currentWeather .feelsLike");
  const humidityDiv = document.querySelector(".currentWeather .humidity");
  const chanceOfRainDiv = document.querySelector(
    ".currentWeather .chanceOfRain"
  );
  const windSpeedDiv = document.querySelector(".currentWeather .windSpeed");

  conditionTextDiv.textContent = weather.current.text;
  locationNameDiv.textContent = weather.location.name;
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
  tempDiv.textContent = weather.current.temp_c + " °C";
  conditionIconImg.src = weather.current.icon;
  feelsLikeDiv.textContent = weather.current.feelslike_c + " °C";
  humidityDiv.textContent = weather.current.humidity + " %";
  chanceOfRainDiv.textContent = weather.current.chance_of_rain + " %";
  windSpeedDiv.textContent = weather.current.wind_kph + " km/h";
}

function renderNextDayWeather(weather) {
  const dayOfWeekDiv = document.querySelector(".nextDayWeather .dayOfWeek");
  const tempHighDiv = document.querySelector(".nextDayWeather .tempHigh");
  const tempLowDiv = document.querySelector(".nextDayWeather .tempLow");
  const conditionIconImg = document.querySelector(
    ".nextDayWeather .conditionIcon"
  );

  dayOfWeekDiv.textContent = format(
    addDays(
      utcToZonedTime(
        fromUnixTime(weather.location.localtime_epoch),
        weather.location.tz_id
      ),
      1
    ),
    "EEEE"
  );
  tempHighDiv.textContent = weather.nextDay.maxtemp_c + " °C";
  tempLowDiv.textContent = weather.nextDay.mintemp_c + " °C";
  conditionIconImg.src = weather.nextDay.icon;
}

function renderNextDayWeather2(weather) {
  const dayOfWeekDiv = document.querySelector(".nextDayWeather2 .dayOfWeek");
  const tempHighDiv = document.querySelector(".nextDayWeather2 .tempHigh");
  const tempLowDiv = document.querySelector(".nextDayWeather2 .tempLow");
  const conditionIconImg = document.querySelector(
    ".nextDayWeather2 .conditionIcon"
  );

  dayOfWeekDiv.textContent = format(
    addDays(
      utcToZonedTime(
        fromUnixTime(weather.location.localtime_epoch),
        weather.location.tz_id
      ),
      2
    ),
    "EEEE"
  );
  tempHighDiv.textContent = weather.nextDay2.maxtemp_c + " °C";
  tempLowDiv.textContent = weather.nextDay2.mintemp_c + " °C";
  conditionIconImg.src = weather.nextDay2.icon;
}

// TODO: Finish this rendering function and then make slideshow functionality
function renderHourlyWeather(weather) {
  const hourlySlides = document.getElementsByClassName("slide");
  const slide1 = hourlySlides[0];
  const slide2 = hourlySlides[1];
  const slide3 = hourlySlides[2];

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
  const conditionIconImg = document.createElement("img");

  timeDiv.textContent = format(
    utcToZonedTime(
      fromUnixTime(weather.next24Hours[index].time_epoch),
      weather.location.tz_id
    ),
    "h aaa"
  );
  tempDiv.textContent = weather.next24Hours[index].temp_c + " °C";
  conditionIconImg.src = weather.next24Hours[index].icon;

  const hourWeatherDiv = document.createElement("div");
  hourWeatherDiv.classList.add("oneHourWeather");

  hourWeatherDiv.appendChild(timeDiv);
  hourWeatherDiv.appendChild(tempDiv);
  hourWeatherDiv.appendChild(conditionIconImg);

  slide.appendChild(hourWeatherDiv);
}

export {
  renderCurrentWeather,
  renderNextDayWeather,
  renderNextDayWeather2,
  renderHourlyWeather,
};
