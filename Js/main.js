const API_KEY = "224385ee91e9eac147966dd324bb6ce9"
async function getWeatherData(city="Brazzaville"){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`)
        
        if(!response.ok){
            throw new Error ("Impossible de récupérer la météo. Réessayer")
        }

        const dataWeather = await response.json()
        console.log(dataWeather)

    }catch(error){
        console.error("Erreur de récupération", error.message )
    }

    
}
getWeatherData("Brazzaville")