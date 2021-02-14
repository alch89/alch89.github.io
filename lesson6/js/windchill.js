
    let temperature = parseFloat(document.getElementById('temp').innerHTML);
    let windSpeed = parseFloat(document.getElementById('wSpeed').innerHTML);
    let result = windChill(temperature, windSpeed)
    document.getElementById('outputDiv').innerHTML = result.toFixed(0);


function windChill(tempF, speed){
    return 35.74 + 0.6215 * tempF - 35.75 * Math.pow(speed, 0.16) + 0.4275 * tempF * Math.pow(speed, 0.16)
}