//Particles
particlesJS.load('particles-js', 'js/particlesjs-config.json', function () {
    // console.log('callback - particles.js config loaded');
});


//suggestions
fetch("https://restcountries.eu/rest/v2/all")
    .then(response => {
        return response.json()
    }).then(data => {

        let list = document.getElementById("datalistOptions");


        for (i = 0; i < data.length; i++) {

            let city = document.createElement("option");
            city.innerHTML = data[i].capital;
            list.appendChild(city);
        }
    }).catch(err => {
        console.log("error appeared");
        console.log(err);
    });


//Html Elements
const ui_humidity = document.getElementById("ui_humidity");
const ui_wind = document.getElementById("ui_wind");
const ui_max = document.getElementById("ui_max");
const ui_min = document.getElementById("ui_min");

const location_ele = document.getElementById("location");
const date_ele = document.getElementById("date");
const temperatur_ele = document.getElementById("temperatur");
const description_ele = document.getElementById("description");
const icon_ele = document.getElementById("weather-icon");

const quote_ele = document.getElementById("quote");
const chuckNorris_ele = document.getElementById("chuckNorris");

const loadingIcon = document.getElementById("loading-icon");
const loadingIconRow = document.getElementById("loading-icon-row");
const hiddenContent = document.getElementById("hidden-content");

//Weather Data
const url = "http://api.openweathermap.org/data/2.5/weather?q=";
const key = "&appid=e6a01a8bcbecfc88b2b123522af7b9d2";
const lang = "&lang=en";
const input = document.getElementById("floatingTextarea");

//Eventlistener Click 
document.getElementById("btn-go").addEventListener("click", e => {
    const city = `${input.value}`;
    const units = `&units=metric`;
    if (input.value === "") {
        return
    } else {
        //OpenWeather
        fetch(`${url}${city}${units}${key}${lang}`)
            .then(response => {
                return response.json()
            }).then(data => {
                // console.log(data);
                displayData(data);

            }).catch(err => {
                console.log("error appeared");
                console.log(err);
            });


        //Quotes
        fetch("https://type.fit/api/quotes")
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                // console.log(data);
                displayQuotes(data);
            }).catch(err => {
                console.log("error appeared");
                console.log(err);
            });

        input.value = "";


        //Animation
        processAnimation();
    }

});

function displayData(data) {
    //process date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date();
    const fullDate = `${date.toLocaleDateString("en-EN", options)}`;


    ui_humidity.innerHTML = `${data.main.humidity} %`;
    ui_wind.innerHTML = `${Math.round(data.wind.speed)} km/h`;
    ui_max.innerHTML = `${Math.round(data.main.temp_max)} °C`;
    ui_min.innerHTML = `${Math.round(data.main.temp_min)} °C`;

    location_ele.innerHTML = `${data.name}`;
    date_ele.innerHTML = `${fullDate}`;
    temperatur_ele.innerHTML = `${Math.round(data.main.temp)}<sup>°C</sup>`;
    description_ele.innerHTML = `${data.weather[0].description}`;
    icon_ele.src = getWeatherIcon(data.weather[0].icon);
}



function getWeatherIcon(icon) {
    return `Assets/svg/${icon}.svg`;
}

function displayQuotes(data) {
    const randomNumber = Math.floor(Math.random() * data.length);
    quote_ele.innerHTML = `<span>Quote of the day:</span> <i>${data[randomNumber].text
        }</i> -
    <b>${data[randomNumber].author}</b> `;
}

function displayChuckNorris(data) {
    chuckNorris_ele.innerHTML = `<span> Also worth mentioning:</span> <i>${data.value}</i>`;
}

function processAnimation() {
    master.restart();
}

//Animation
const master = gsap.timeline();

const showLoadingIcon = gsap.timeline()
    .to(loadingIcon, {
        display: "initial",
        opacity: 0,
        duration: 0
    })
    .to(loadingIcon, {
        opacity: 1,
        duration: 0.5
    })
    .from(loadingIcon, {
        scale: 0,
        duration: 0.5,
        ease: "back.inOut(1.7)"
    }, "-=0.5")
    .to(loadingIcon, {
        rotate: 360,
        duration: 2.5
    }, "-=0.5")
    .to(loadingIcon, {
        scale: 0,
        opacity: 0,
        display: "none",
        duration: 0.5,
        ease: "back.inOut(1.7)"
    }, "-=1")
    .to(loadingIcon, {
        scale: 1,
        duration: 0
    })
    .to(loadingIconRow, {
        display: "none",
        duration: 0
    }, "<")

const revealContent = gsap.timeline()
    .to(hiddenContent, {
        display: "initial",
        duration: 0.1
    })
    .from(".main-anim", {
        scale: 0,
        stagger: 0.1,
        duration: 0.4,
        ease: "back.out(3)",
        x: -100
    })
    .from(".ui-ele", {
        opacity: 0,
        stagger: 0.1,
        duration: 0.4,
        ease: "back.inOut(1.7)"
    }, "-=0.2")
    .from(".my-ui-element__img", {
        scale: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: "back.out(6)"
    }, "-=0.5")

    .from("#quote", {
        opacity: 0,
        duration: 0.6,
        ease: "linear"
    });
master
    .add(showLoadingIcon)
    .add(revealContent)

master.pause();