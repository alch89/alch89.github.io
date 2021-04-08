
//let cityID = 3936456;
//let appid = "b8d1b70c38ea96665bef453b4918652b";

// ----------Weather Summary-------------
const requestURLweather = `https://api.openweathermap.org/data/2.5/weather?id=3936456&appid=b8d1b70c38ea96665bef453b4918652b&units=imperial`;

fetch(requestURLweather)
    .then((response) => response.json())
    .then((jsonObject) => {
        console.log(jsonObject);
        document.getElementById('temperature').textContent = `${jsonObject.weather[0].main}, ${jsonObject.main.temp.toFixed(0)}`;
        //document.getElementById('max-temp').textContent = jsonObject.main.temp_max.toFixed(0);
        //document.getElementById('min-temp').textContent = jsonObject.main.temp_min.toFixed(0);
        document.getElementById('humidity').textContent = jsonObject.main.humidity;
       // document.getElementById('wind').textContent = jsonObject.wind.speed;
        document.getElementById('description').textContent = jsonObject.weather[0].description;
        

        // -------------------Setting up Wind Chill----------------
        
    });



    const apiURLForecast =
  "https://api.openweathermap.org/data/2.5/forecast?id=3936456&appid=b8d1b70c38ea96665bef453b4918652b&units=imperial";

    fetch(apiURLForecast)
  .then((response) => response.json())
  .then((jsObject) => {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const forecast = jsObject["list"].filter((day) =>
      day.dt_txt.includes("18:00:00")
    );

    for (let i = 0; i < 5; i++) {
      let day = forecast[i];
      
      let date = new Date(day.dt_txt);
      let weekday = weekdays[date.getDay()];
      document.querySelector(
        `#fiveday thead>tr>th:nth-child(${i + 1})`
      ).innerText = weekday;

      let imagesrc = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;
      let desc = day.weather[0].description;
      document
        .querySelector(`#fiveday tbody>tr>td:nth-child(${i + 1}) img`)
        .setAttribute("src", imagesrc);
      document
        .querySelector(`#fiveday tbody>tr>td:nth-child(${i + 1}) img`)
        .setAttribute("alt", desc);

      document.querySelector(
        `#fiveday tbody>tr>td:nth-child(${i + 1}) span`
      ).innerText = `${Math.round(day.main.temp)}`;
    }
  });
