const apiKey = "";

const search = document.querySelector(".search-bar");
const failedText = document.querySelector(".failed");
const button = document.querySelector(".button");

function fetchWeather(city) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=metric&appid=" +
      apiKey
  )
    .then((response) => {
      if (!response.ok) {
        resetData();
        failedText.classList.remove("failed");
        throw new Error("No weather found.");
      }
      return response.json();
    })
    .then((data) => {
      displayWeather(data);
    });
}

function displayWeather(data) {
  failedText.classList.add("failed");
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML =
    "Humidity: " + data.main.humidity + "%";
  document.querySelector(".description").innerHTML =
    data.weather[0].description;
  document.querySelector(".city").innerHTML = "Weather in " + data.name;
  document.querySelector(".wind").innerHTML =
    "Wind Speed: " + data.wind.speed + " km/h";
  document.querySelector(".icon").src =
    "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
  document.body.style.backgroundImage =
    "url('https://source.unsplash.com/1600x900/?" + data.name + "')";
  document.querySelector(".weather").classList.remove("loading");
  search.value = " ";
}

function resetData() {
  document.querySelector(".temp").innerHTML = "";
  document.querySelector(".humidity").innerHTML = "";
  document.querySelector(".description").innerHTML = "";
  document.querySelector(".city").innerHTML = "";
  document.querySelector(".wind").innerHTML = "";
  document.querySelector(".icon").src = "";
  document.body.style.backgroundImage =
    "url('https://source.unsplash.com/1600x900/?landscape";
  document.querySelector(".weather").classList.add("loading");
}

button.addEventListener("click", function () {
  fetchWeather(search.value);
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      fetchWeather(search.value);
    }
  });
