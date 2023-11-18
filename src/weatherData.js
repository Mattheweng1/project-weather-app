import { showNoMatchesError } from "./animate";

// Fetch data & show error if no matches
async function fetchData(url) {
  const response = await fetch(url, {
    mode: "cors",
  });

  if (response.status === 400) {
    showNoMatchesError();
    return;
  }

  const data = await response.json();
  return data;
}

function getForecastUrlFromInput() {
  const searchInput = document.querySelector(".searchBar input");
  return `https://api.weatherapi.com/v1/forecast.json?key=290bb3875a474307b09152332230911&q=${searchInput.value}&days=3&aqi=no&alerts=no`;
}

function filterForecastData(forecastData) {
  if (!forecastData) {
    return;
  }

  const locationData = forecastData.location;
  const currentWeatherData = forecastData.current;
  const currentHourWeatherData =
    forecastData.forecast.forecastday[0].hour[getCurrentHour(forecastData)];
  const dayPlus1Data = forecastData.forecast.forecastday[1].day;
  const dayPlus2Data = forecastData.forecast.forecastday[2].day;

  const weather = {
    location: {
      name: locationData.name,
      region: locationData.region,
      country: locationData.country,
      localtime_epoch: locationData.localtime_epoch,
      localtime: locationData.localtime,
      tz_id: locationData.tz_id,
    },
    current: {
      text: currentWeatherData.condition.text,
      icon: currentWeatherData.condition.icon,
      temp_c: currentWeatherData.temp_c,
      temp_f: currentWeatherData.temp_f,
      feelslike_c: currentWeatherData.feelslike_c,
      feelslike_f: currentWeatherData.feelslike_f,
      humidity: currentWeatherData.humidity,
      chance_of_rain: currentHourWeatherData.chance_of_rain,
      wind_kph: currentWeatherData.wind_kph,
      wind_mph: currentWeatherData.wind_mph,
    },
    nextDays: [
      {
        text: dayPlus1Data.condition.text,
        icon: dayPlus1Data.condition.icon,
        maxtemp_c: dayPlus1Data.maxtemp_c,
        maxtemp_f: dayPlus1Data.maxtemp_f,
        mintemp_c: dayPlus1Data.mintemp_c,
        mintemp_f: dayPlus1Data.mintemp_f,
      },
      {
        text: dayPlus2Data.condition.text,
        icon: dayPlus2Data.condition.icon,
        maxtemp_c: dayPlus2Data.maxtemp_c,
        maxtemp_f: dayPlus2Data.maxtemp_f,
        mintemp_c: dayPlus2Data.mintemp_c,
        mintemp_f: dayPlus2Data.mintemp_f,
      },
    ],
    next24Hours: filterNext24HoursData(getNext24HoursData(forecastData)),
  };

  return weather;
}

function getNext24HoursData(forecastData) {
  const nextHour = getCurrentHour(forecastData) + 1;
  const todayHoursData = forecastData.forecast.forecastday[0].hour;
  const tomorrowHoursData = forecastData.forecast.forecastday[1].hour;
  const todayAndTomorrowHoursData = todayHoursData.concat(tomorrowHoursData);
  const next24HoursData = [];

  for (let i = nextHour; i < nextHour + 24; i++) {
    next24HoursData.push(todayAndTomorrowHoursData[i]);
  }
  return next24HoursData;
}

function filterNext24HoursData(next24HoursData) {
  const newNext24HoursData = next24HoursData.map((hourData) => {
    const newHourData = {
      time_epoch: hourData.time_epoch,
      temp_c: hourData.temp_c,
      temp_f: hourData.temp_f,
      icon: hourData.condition.icon,
    };
    return newHourData;
  });
  return newNext24HoursData;
}

function getCurrentHour(forecastData) {
  const timeStr = forecastData.location.localtime;
  const hourStr = timeStr.slice(-5, -3);
  const hour = Number(hourStr);
  return hour;
}

export { fetchData, filterForecastData, getForecastUrlFromInput };
