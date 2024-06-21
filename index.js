const searchInput = document.getElementById("searchInput");
const day = document.querySelectorAll(".day");
const month = document.getElementById("month");
const mainDegree = document.getElementById("mainDegree");
const city = document.getElementById("city");
const apiKey = "2e51ae3324074495b7903803241906";
const minDegree1 = document.getElementById("minDegree1");
const maxDegree1 = document.getElementById("maxDegree1");
const minDegree2 = document.getElementById("minDegree2");
const maxDegree2 = document.getElementById("maxDegree2");
const weatherState1 = document.getElementById("weatherState1");
const weatherState2 = document.getElementById("weatherState2");
const todayIcon = document.getElementById("todayIcon");
const todayState = document.getElementById("todayState");
const secondDayIcon = document.getElementById("2nd-icon");
const thirdDayIcon = document.getElementById("3rd-icon");
const mainContainer = document.getElementById("main");

async function getWeatherData(query) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=3`
    );

    console.log(response);
    const data = await response.json();
    console.log(data);
    displayData(data);
  } catch (err) {
    console.error(err);
  }
}

navigator.geolocation.getCurrentPosition(function (position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const query = `${latitude},${longitude}`;
  console.log(position);
  getWeatherData(query);
});

function displayData(data) {
  const forecastDays = data.forecast.forecastday;
  const monthName = new Date(forecastDays[0].date);
  month.innerHTML = monthName.toLocaleString("default", { month: "long" });
  const days = [day[0], day[1], day[2]];
  todayIcon.src = data.forecast.forecastday[0].day.condition.icon;
  city.innerHTML = data.location.name;
  for (let i = 0; i < days.length; i++) {
    days[i].innerHTML = new Date(forecastDays[i].date).toLocaleString(
      "locale",
      {
        weekday: "long",
      }
    );
  }

  displayDegrees(
    todayState,
    mainDegree,
    minDegree1,
    maxDegree1,
    minDegree2,
    maxDegree2,
    data
  );

  displayState(todayState, weatherState1, weatherState2, data);

  secondDayIcon.src = data.forecast.forecastday[1].day.condition.icon;
  thirdDayIcon.src = data.forecast.forecastday[2].day.condition.icon;
}

function displayState(today, tommorw, after, data) {
  today.innerHTML = data.forecast.forecastday[0].day.condition.text;
  tommorw.innerHTML = data.forecast.forecastday[1].day.condition.text;
  after.innerHTML = data.forecast.forecastday[2].day.condition.text;
}

function displayDegrees(todayState, main, min1, max1, min2, max2, data) {
  todayState.innerHTML = data.forecast.forecastday[0].day.condition.text;
  main.innerHTML = data.current.temp_c;

  min1.innerHTML = data.forecast.forecastday[1].day.mintemp_c;
  max1.innerHTML = data.forecast.forecastday[1].day.maxtemp_c;
  min2.innerHTML = data.forecast.forecastday[2].day.mintemp_c;
  max2.innerHTML = data.forecast.forecastday[2].day.maxtemp_c;
}

function displayError(err) {
  const errorContainer = `<div class="alert w-100 py-4 alert-danger d-flex align-items-center" role="alert">
  <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
  <div>
    <h1 class='text-alert text-center fs-1 fw-bold'>${err}</h1>
  </div>
</div>`;

  mainContainer.innerHTML = errorContainer;
}

searchInput.addEventListener("input", function () {
  getWeatherData(searchInput.value);
});
