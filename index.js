let apiKey = "de9c9bc1492c06e57ceece9c72f7768c";
let apiUrl = "https://api.openweathermap.org/data/2.5/forecast";

window.onload = function() {
    navigator.geolocation.getCurrentPosition(showLocation);
}

function getPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showLocation);
}

function showLocation(pos) {
    let crd = pos.coords;

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);

    let apiCallUrl = `${apiUrl}?lat=${crd.latitude}&lon=${crd.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiCallUrl).then(getNowTemperature);

}

let locationElm = document.querySelector("#location");
locationElm.addEventListener("click", getPosition);


function searchCity(event) {
    event.preventDefault();
    let search = document.querySelector("#searchInput");
    let apiCallUrl = `${apiUrl}?q=${search.value}&appid=${apiKey}&units=metric`;
    axios.get(apiCallUrl).then(getNowTemperature);
}

function getForecast(list) {
    let idx;

    for (idx = 1; idx <= 4; idx++) {

        let wdidx = document.querySelector("#wday" + idx);
        let currentDate = new Date(list[(idx * 8)].dt_txt);
        wdidx.innerHTML = weekday[currentDate.getDay()];

        let tempidx = document.querySelector("#temp" + idx);
        let temp = Math.round(list[(idx * 8)].main.temp);
        tempidx.innerHTML = `${temp}º`;

        let iconidx = document.querySelector("#icon" + idx);
        let icon = (list[(idx * 8)].weather[0].icon);
        // iconidx.innerHTML = `${icon}`;
        iconidx.innerHTML = `<img src='https://openweathermap.org/img/wn/${icon}@2x.png' class="icon">`;

    }
}

function getNowTemperature(response) {
    let minTemperature = Math.round(response.data.list[0].main.temp_min);
    let maxTemperature = Math.round(response.data.list[0].main.temp_max);
    let city = (response.data.city.name);

    console.log(minTemperature);
    console.log(maxTemperature);
    console.log(city);

    let cityElm = document.querySelector("#city");
    cityElm.innerHTML = `${city}`;
    let wd0 = document.querySelector("#wday0");
    let icon0 = document.querySelector("#icon0");
    let icon = (response.data.list[0].weather[0].icon);

    wd0.innerHTML = `${day}, ${hours}:${minutes}`;
    icon0.innerHTML = `<img src='https://openweathermap.org/img/wn/${icon}@2x.png' class="icon">`;


    let minTempElm = document.querySelector("#minTemp0");
    minTempElm.innerHTML = `${minTemperature}º`;
    let maxTempElm = document.querySelector("#maxTemp0");
    maxTempElm.innerHTML = `${maxTemperature}º`;

    getForecast(response.data.list);
}

let search = document.querySelector("#search");
search.addEventListener("click", searchCity);



// Current Date
let now = new Date();

let weekday = ["Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
];
let day = weekday[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

if (minutes < 10) {
    minutes = "0" + minutes;
}