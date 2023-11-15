async function fetchData(url) {
  const response = await fetch(url, {
    mode: "cors",
  });
  const data = await response.json();
  return data;
}

function filterForecastData(forecastData) {
  const weather = {};

  // Location
  const locationData = forecastData.location;
  weather.location = {};
  weather.location.name = locationData.name;
  weather.location.region = locationData.region;
  weather.location.localtime_epoch = locationData.localtime_epoch;
  weather.location.localtime = locationData.localtime;
  weather.location.tz_id = locationData.tz_id;

  // Current Weather
  const currentWeatherData = forecastData.current;
  const currentHourWeatherData =
    forecastData.forecast.forecastday[0].hour[getCurrentHour(forecastData)];
  console.log(getCurrentHour(forecastData));
  weather.current = {};
  weather.current.text = currentWeatherData.condition.text;
  weather.current.icon = currentWeatherData.condition.icon;
  weather.current.temp_c = currentWeatherData.temp_c;
  weather.current.temp_f = currentWeatherData.temp_f;
  weather.current.feelslike_c = currentWeatherData.feelslike_c;
  weather.current.feelslike_f = currentWeatherData.feelslike_f;
  weather.current.humidity = currentWeatherData.humidity;
  weather.current.chance_of_rain = currentHourWeatherData.chance_of_rain;
  weather.current.wind_kph = currentWeatherData.wind_kph;
  weather.current.wind_mph = currentWeatherData.wind_mph;

  // Tomorrow's Weather
  const nextDayWeatherData = forecastData.forecast.forecastday[1].day;
  weather.nextDay = {};
  weather.nextDay.text = nextDayWeatherData.condition.text;
  weather.nextDay.icon = nextDayWeatherData.condition.icon;
  weather.nextDay.maxtemp_c = nextDayWeatherData.maxtemp_c;
  weather.nextDay.maxtemp_f = nextDayWeatherData.maxtemp_f;
  weather.nextDay.mintemp_c = nextDayWeatherData.mintemp_c;
  weather.nextDay.mintemp_f = nextDayWeatherData.mintemp_f;

  // Day after Tomorrow's Weather
  const nextDayWeather2Data = forecastData.forecast.forecastday[2].day;
  weather.nextDay2 = {};
  weather.nextDay2.text = nextDayWeather2Data.condition.text;
  weather.nextDay2.icon = nextDayWeather2Data.condition.icon;
  weather.nextDay2.maxtemp_c = nextDayWeather2Data.maxtemp_c;
  weather.nextDay2.maxtemp_f = nextDayWeather2Data.maxtemp_f;
  weather.nextDay2.mintemp_c = nextDayWeather2Data.mintemp_c;
  weather.nextDay2.mintemp_f = nextDayWeather2Data.mintemp_f;

  // Next 24 Hours Weather
  weather.next24Hours = filterNext24HoursData(getNext24HoursData(forecastData));

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
    const newHourData = {};
    newHourData.time_epoch = hourData.time_epoch;
    newHourData.temp_c = hourData.temp_c;
    newHourData.temp_f = hourData.temp_f;
    newHourData.icon = hourData.condition.icon;
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

export { fetchData, filterForecastData };
