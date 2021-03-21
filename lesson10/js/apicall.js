// ---------------JSON Request-----------------------
let cityID = 5604473;
let appid = "65aaffae0d89798b595cc40e7e0e01d0";

// ----------Weather Summary-------------
const requestURLweather = `https://api.openweathermap.org/data/2.5/weather?id=${cityID}&appid=${appid}&units=imperial`;

fetch(requestURLweather)
    .then((response) => response.json())
    .then((jsonObject) => {
        console.log(jsonObject);
        document.getElementById('temperature').textContent = `${jsonObject.weather[0].main}, ${jsonObject.main.temp.toFixed(0)}`;
        document.getElementById('max-temp').textContent = jsonObject.main.temp_max.toFixed(0);
        document.getElementById('min-temp').textContent = jsonObject.main.temp_min.toFixed(0);
        document.getElementById('humidity').textContent = jsonObject.main.humidity;
        document.getElementById('wind').textContent = jsonObject.wind.speed;

        // -------------------Setting up Wind Chill----------------
        let t = parseFloat(jsonObject.main.temp);
        let s = parseFloat(jsonObject.wind.speed);
        let f = calc(t, s);
        function calc(x, y) {
            let result = 35.74 + (0.6215 * x) - (35.75 * Math.pow(y, 0.16)) + (0.4275 * x * Math.pow(y, 0.16));
            return result.toFixed(0);
        }
        let finalResult = (t <= 50 && s > 3) ? `${f}°F` : 'N/A';
        document.getElementById('windchill').textContent = finalResult;
    });