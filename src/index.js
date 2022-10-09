let apiKey = "e0a5a97de9a0b7a951e9d154a8f9bad8";
function displayTemperature(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let weather = response.data.weather[0];
  let weatherMane = document.querySelector("#weather-mane");
  weatherMane.innerHTML = weather.main;
  let weatherIcon = document.querySelector(".weather-icon");
  weatherIcon.src = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`;
  let temp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${temp}°`;

  let precipitation = document.querySelector("#prec");
  precipitation.innerHTML = response.data.clouds.all;
  let humidity = document.querySelector("#hum");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed;
}
function search() {
  let searchInput = document.querySelector("#city-input");
  if (searchInput.value) {
    let city = searchInput.value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayTemperature);
  }
}
let form = document.querySelector("#city-form");
form.addEventListener("submit", search);

function ShowPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}
function showCurrentLocation(position) {
  navigator.geolocation.getCurrentPosition(ShowPosition);
}
let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", showCurrentLocation);

function formatDate(curDate) {
  let hour = curDate.getHours();
  let minute = curDate.getMinutes();

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

  let formattedDate = `${day} ${hour}:${minute}`;
  return formattedDate;
}
let date = document.querySelector("#date");
date.innerHTML = formatDate(new Date());

let curTemp = 17;
function change(event) {
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = curTemp + "°";
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", change);
function changeUnits(event) {
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = (curTemp * 9) / 5 + 32 + "°";
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", changeUnits);
