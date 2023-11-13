async function fetchData(url) {
  const response = await fetch(url, {
    mode: "cors",
  });
  const data = await response.json();
  return data;
}

function filterForecastData(forecastData) {
  // Location
  const locationData = forecastData.location;
  const location = {};
  location.name = locationData.name;
  location.region = locationData.region;
  location.localtime_epoch = locationData.localtime_epoch;

  // Current Weather
  const currentWeatherData = forecastData.current;
  const currentHourWeatherData =
    forecastData.forecast.forecastday[0].hour[getCurrentHour(forecastData)];
  const currentWeather = {};
  currentWeather.text = currentWeatherData.condition.text;
  currentWeather.icon = currentWeatherData.condition.icon;
  currentWeather.temp_c = currentWeatherData.temp_c;
  currentWeather.temp_f = currentWeatherData.temp_f;
  currentWeather.feelslike_c = currentWeatherData.feelslike_c;
  currentWeather.feelslike_f = currentWeatherData.feelslike_f;
  currentWeather.humidity = currentWeatherData.humidity;
  currentWeather.chance_of_rain = currentHourWeatherData.chance_of_rain;

  // Tomorrow's Weather
  const nextDayWeatherData = forecastData.forecast.forecastday[1].day;
  const nextDayWeather = {};
  nextDayWeather.text = nextDayWeatherData.condition.text;
  nextDayWeather.icon = nextDayWeatherData.condition.icon;
  nextDayWeather.maxtemp_c = nextDayWeatherData.maxtemp_c;
  nextDayWeather.maxtemp_f = nextDayWeatherData.maxtemp_f;
  nextDayWeather.mintemp_c = nextDayWeatherData.mintemp_c;
  nextDayWeather.mintemp_f = nextDayWeatherData.mintemp_f;

  // Day after Tomorrow's Weather
  const nextDayWeather2Data = forecastData.forecast.forecastday[2].day;
  const nextDayWeather2 = {};
  nextDayWeather2.text = nextDayWeather2Data.condition.text;
  nextDayWeather2.icon = nextDayWeather2Data.condition.icon;
  nextDayWeather2.maxtemp_c = nextDayWeather2Data.maxtemp_c;
  nextDayWeather2.maxtemp_f = nextDayWeather2Data.maxtemp_f;
  nextDayWeather2.mintemp_c = nextDayWeather2Data.mintemp_c;
  nextDayWeather2.mintemp_f = nextDayWeather2Data.mintemp_f;

  // All Weather
  const weather = {};
  weather.location = location;
  weather.current = currentWeather;
  weather.nextDay = nextDayWeather;
  weather.nextDay2 = nextDayWeather2;

  return weather;
}

function getCurrentHour(forecastData) {
  const timeStr = forecastData.current.last_updated;
  const hourStr = timeStr.slice(-5, -3);
  const hour = Number(hourStr);
  return hour;
}

export { fetchData, filterForecastData };
