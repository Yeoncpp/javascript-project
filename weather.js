const weather = document.querySelector(".js-weather");
const API_KEY = "2b63e32e4b30549911edf693d7b570a4";

const COORDS_LS = "COORDS";

function getWeather(lat,long){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        const temperature = json.main.temp;
        const sky = json.weather[0].main;
        const place = json.name;
        weather.innerText = `${sky} now ${temperature} ℃ at ${place}`;
    })
    //then은 데이터가 완전히 들어온 다음 함수를 호출한다
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS_LS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoError(position){
    console.log('Cant access geo location');
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoord(){
    const loadedCoord = localStorage.getItem(COORDS_LS);
    if(loadedCoord === null){
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoord);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}


function init(){
    loadCoord();
}

init();