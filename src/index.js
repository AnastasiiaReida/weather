function addZero(ourNum) {
  if (ourNum < 10) {
    ourNum = `0${ourNum}`;
  }
  return ourNum;
}
function formatDate(timestamp) {
  let curDate = new Date(timestamp);
  let hour = addZero(curDate.getHours());
  let minute = addZero(curDate.getMinutes());

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[curDate.getDay()];

  let formattedDate = `: ${day} ${hour}:${minute}`;
  return formattedDate;
}
function formatweakDays(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let daily = response.data.days;
  let forecastHTML = "";
  let numColum = 8;

  forecastHTML = forecastHTML + `<div class="col-12 col-sm-6 row">`;
  daily.forEach(function (dailyDay, index) {
    if (index < numColum) {
      if (index === 4) {
        forecastHTML =
          forecastHTML +
          `</div>
            <div class="col-12 col-sm-6 row">`;
      }
      forecastHTML =
        forecastHTML +
        `<div class="col-3">
            <div class="weather-forecast-date">${formatweakDays(
              dailyDay.datetimeEpoch
            )}</div>
            <img
              src="images/${dailyDay.icon}.png"
              alt="${dailyDay.icon}"
              width="36"
            />
            <div class="weather-forecast-temperature">
              ${Math.round(dailyDay.tempmax)}° /
              <div class="weather-forecast-temperature-min">${Math.round(
                dailyDay.tempmin
              )}°</div>
            </div>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "U8L65PTB7DY7FNRHAZ9SD98MX";
  let apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${coordinates.lat},${coordinates.lon}?key=${apiKey}&unitGroup=metric`;
  //`https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayTemperature(response) {
  let weather = response.data.weather[0];
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let weatherIconElement = document.querySelector(".weather-icon");
  let temperatureElement = document.querySelector("#temperature");
  let precipitationElement = document.querySelector("#prec");
  let humidityElement = document.querySelector("#hum");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");

  curTemp = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = weather.description;
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${weather.icon}@2x.png`
  );
  weatherIconElement.setAttribute("alt", weather.description);
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  precipitationElement.innerHTML = response.data.clouds.all;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  getForecast(response.data.coord);
}
function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#city-input");
  if (searchInputElement.value) {
    let city = searchInputElement.value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayTemperature);
  }
}
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}
function showCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLinkElement.classList.remove("active");
  fahrenheitLinkElement.classList.add("active");
  temperatureElement.innerHTML = Math.round((curTemp * 9) / 5 + 32);
}
function displayCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  fahrenheitLinkElement.classList.remove("active");
  celsiusLinkElement.classList.add("active");
  temperatureElement.innerHTML = Math.round(curTemp);
}

let apiKey = "64469ac67e6dc941feb5b50915a18dc7";
let curTemp = null;

let formElement = document.querySelector("#city-form");
let currentLocationElement = document.querySelector("#current-location");
let celsiusLinkElement = document.querySelector("#celsius-link");
let fahrenheitLinkElement = document.querySelector("#fahrenheit-link");

formElement.addEventListener("submit", search);
currentLocationElement.addEventListener("click", showCurrentLocation);
fahrenheitLinkElement.addEventListener("click", displayFahrenheit);
celsiusLinkElement.addEventListener("click", displayCelsius);
showCurrentLocation();
