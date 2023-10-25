const apiKey = "dc18b6120ad964dfe0da64216d394f74";

const search = document.querySelector(".search-bar");

function fetchWeather(city) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=metric&appid=" +
      apiKey
  )
    .then((response) => response.json())
    .then((data) => {
      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + "°C";
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
    });
  search.value = " ";
}

const button = document.querySelector(".button");
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
