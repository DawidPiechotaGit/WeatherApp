const apiKey = "dc18b6120ad964dfe0da64216d394f74";

function fetchWeather(city) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=metric&appid=" +
      apiKey
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.querySelector(".temp").innerHTML = data.main.temp + "°C";
      document.querySelector(".humidity").innerHTML =
        "Humidity: " + data.main.humidity + "%";
      document.querySelector(".city").innerHTML = "Weather in " + data.name;
      document.querySelector(".wind").innerHTML =
        "Wind Speed: " + data.wind.speed + " KMH";
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + data.name + "')";
      document.querySelector(".weather").classList.remove("loading");
    });
}

const search = document.querySelector(".search-bar");
const searchValue = search.value;

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
