import React from "react"
import { useState, useEffect } from "react"
import Temperature from "./Components/Temperature"
import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"
import Searchbar from "./Components/Searchbar"

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(null)
  const [apiLocationName, setapiLocationName] = useState(null)
  const [temperature, setTemperature] = useState(null)
  const [inputLocation, setInputLocation] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    handleLocation(inputLocation)
  }

  function handleLocation(locationValue) {
    const getGeolocation = async () => {
      const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${locationValue}&count=10&language=en&format=json`);
      const data = await res.json();
      return data;
    }

    getGeolocation().then(data => {
      setapiLocationName(data.results[0].name + ", " + data.results[0].admin1)
      handleWeather(data.results[0].latitude, data.results[0].longitude)
    }).then(() => {
      setError(null) // clear any existing errors if successful
    })
      .catch(err => {
        setError("No location found. Please check your input and try again.")
      })
  }

  function handleWeather(latitude, longitude) {
    const getWeather = async () => {
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&hourly=temperature_2m&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`);
      const data = await res.json();
      return data;
    }

    getWeather().then(data => {
      setWeatherData(data)
      setTemperature(Math.floor(data.current.temperature_2m))
      setError(null) // clear any existing errors if successful
    })
    .catch(err => {
      setError("No location found. Please check your input and try again.")
    })
  }

  useEffect(() => {
    // setting document title without helmet
    document.title = "Weather Checker Application"
  }, [])

  return (
    <div className="wrapper bg-sky-background bg-cover">
      <Navbar />
      <main className="min-h-screen">
        <h1 className="sr-only">Weather Checker Application</h1>
        <div className="container mx-auto">
          <section id="weather-container" className="p-5">

            <Searchbar submitFunction={handleSubmit} error={error} inputLocation={inputLocation} onInputLocation={setInputLocation} onError={setError} />

            <Temperature temperature={temperature} locationname={apiLocationName} weatherdata={weatherData} />
            
          </section>
        </div>
      </main>
      <Footer />
      </div>
  )
}

export default App