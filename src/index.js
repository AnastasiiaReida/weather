let apiKey = "e0a5a97de9a0b7a951e9d154a8f9bad8";
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

  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = weather.description;
  weatherIconElement.src = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  precipitationElement.innerHTML = response.data.clouds.all;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}
function search() {
  let searchInputElement = document.querySelector("#city-input");
  if (searchInputElement.value) {
    let city = searchInputElement.value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayTemperature);
  }
}
let formElement = document.querySelector("#city-form");
formElement.addEventListener("submit", search);

function ShowPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}
function showCurrentLocation(position) {
  navigator.geolocation.getCurrentPosition(ShowPosition);
}
let currentLocationElement = document.querySelector("#current-location");
currentLocationElement.addEventListener("click", showCurrentLocation);

//let dateElement = document.querySelector("#date");
//dateElement.innerHTML = formatDate(new Date());

let curTemp = 17;
function change(event) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = curTemp + "°";
}
let celsiusLinkElement = document.querySelector("#celsius-link");
celsiusLinkElement.addEventListener("click", change);
function changeUnits(event) {
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = (curTemp * 9) / 5 + 32 + "°";
}
let fahrenheitLinkElement = document.querySelector("#fahrenheit-link");
fahrenheitLinkElement.addEventListener("click", changeUnits);
