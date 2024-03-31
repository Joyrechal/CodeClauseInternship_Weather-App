function getWeather() {
   const apikey = '4fb63211f27daceac90aa9b0dab2c4e8';
   const city = document.getElementById('city').value;

   if (!city) {
    alert('Please enter a city');
    return;
   }

   const currentWeatherUrl = 'https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}';
   const forecastUrl = 'https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}';

   fetch(currentWeatherUrl)
   .then(response => response.json())
   .then(data => {
       displayWeather(data);
   })
   .catch(error => {
    console.error('Error fetching current weather data:', error);
    alert('Error fetching current weather data.please try again.');
});
fetch(forecastUrl)
.then(response => response.json())
.then(data => {
    displayHourlyForecast(data.list);
})
.catch(error => {
    console.error('Error fetching hourly forecast data:', error);
    alert('Error fetching hourly forecast data.please try again.');
});

}
function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementryById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    //clear previous content
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = '<p>${data.message}</p>';
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = 'https://openweathermap.org/img/wn/${iconCode}@4x.png';

        const temperatureHTML = '<P>${temparature} degreecelsius </p>';

        const weatherHtml = '<p>${cityName}</p> <p>${description}</p>';

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.HTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();

    }
}
function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementyById('hourly-forecast');
    const next24Hours = hourlyData.slice(0,8);

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(data.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = 'https://openweathermap.org/img/wn/${iconCode}@4x.png';

        
    
        const hourlyItemHtml = '<div class="hourly-item"> <span>${hour}:00</span> <img src="${iconUrl}" alt="Hourly Weather Icon"></img> <span>${temperature}degreecelsius</span>  </div>';

    hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}
function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}