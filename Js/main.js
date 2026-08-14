const API_KEY = "224385ee91e9eac147966dd324bb6ce9"
async function getWeatherData(city="Brazzaville"){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=fr`)
        
        if(!response.ok){
            throw new Error ("Impossible de récupérer la météo. Réessayer")
        }

        const dataWeather = await response.json()
        console.log(dataWeather)

        displayWeather(dataWeather)

    }catch(error){
        console.error("Erreur de récupération", error.message )
    }
}

function displayWeather(dataWeather){
    document.getElementById('name').textContent = dataWeather.name
    const conversion = new Date(dataWeather.dt * 1000)

    const format = conversion.toLocaleDateString("fr-FR", {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        })
    document.getElementById('date').textContent = `Aujourd'hui. ${format}`
    
    document.getElementById('degree').textContent = `${Math.round(dataWeather.main.temp)}°C`
    document.getElementById('description').textContent = dataWeather.weather[0].description
    document.getElementById('ressenti').textContent = `Ressenti : ${Math.round(dataWeather.main.feels_like)}°`

    const sunRise = new Date(dataWeather.sys.sunrise * 1000).toLocaleTimeString('fr-FR', {hour: '2-digit', minute:  '2-digit'})
    const sunSet = new Date(dataWeather.sys.sunset * 1000).toLocaleTimeString('fr-FR', {hour: '2-digit', minute:  '2-digit'})
    
    document.getElementById('sunrise').textContent = sunRise
    document.getElementById('sunset').textContent = sunSet

    document.getElementById('humidity').textContent = `${dataWeather.main.humidity} % Humidité`
    document.getElementById('vent').textContent = `${dataWeather.wind.speed} km/h Vent`
    document.getElementById('pression').textContent = `${dataWeather.main.pressure} hPa Pression`
    document.getElementById('visibility').textContent = `${dataWeather.visibility} km Visibilité`
}

getWeatherData("Brazzaville")