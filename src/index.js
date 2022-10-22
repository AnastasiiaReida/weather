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
function changeTemperature(units, event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  if ((units = "fahrenheit")) {
    celsiusLinkElement.classList.remove("active");
    fahrenheitLinkElement.classList.add("active");
    temperatureElement.innerHTML = Math.round((curTemp * 9) / 5 + 32);
  } else {
    fahrenheitLinkElement.classList.remove("active");
    celsiusLinkElement.classList.add("active");
    temperatureElement.innerHTML = Math.round(curTemp);
  }
}

let apiKey = "e0a5a97de9a0b7a951e9d154a8f9bad8";
let curTemp = null;

let formElement = document.querySelector("#city-form");
let currentLocationElement = document.querySelector("#current-location");
let celsiusLinkElement = document.querySelector("#celsius-link");
let fahrenheitLinkElement = document.querySelector("#fahrenheit-link");

formElement.addEventListener("submit", search);
currentLocationElement.addEventListener("click", showCurrentLocation);
celsiusLinkElement.addEventListener("click", changeTemperature("celsius"));
fahrenheitLinkElement.addEventListener(
  "click",
  changeTemperature("fahrenheit")
);
showCurrentLocation();
