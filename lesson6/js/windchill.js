function doInputOutput(){
    let temperature = parseInt(document.getElementById('temp').value);
    let windSpeed = parseInt(document.getElementById('wSpeed').value);
    let result = windChill(temperature, windSpeed)
    document.getElementById('outputDiv').innerHTML = result.toFixed(0);
}

function windChill(tempF, speed){
    return 35.74 + 0.6215 * tempF - 35.75 * Math.pow(speed, 0.16) + 0.4275 * tempF * Math.pow(speed, 0.16)
}