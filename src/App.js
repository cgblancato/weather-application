import React from "react"
import { useState, useEffect, useRef } from "react"
import Temperature from "./Components/Temperature"


function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(null)
  const [location, setLocation] = useState("New York") // default values set to NYC
  const [apiLocationName, setapiLocationName] = useState("New York")
  const [latitude, setLatitude] = useState(40.710335) // default values set to NYC
  const [longitude, setLongitude] = useState(-73.99309) // default values set to NYC
  const [temperature, setTemperature] = useState(null)
  const inputLocation = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    const locationValue = inputLocation.current.value
    setLocation(locationValue)
  }

  useEffect(() => {
    const options = { method: 'GET', headers: { accept: 'application/json' } }

    const getWeather = () => {
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&temperature_unit=fahrenheit`, {method: 'GET', headers: { accept: 'application/json' }})
        .then(response => response.json())
        .then(data => {
          setWeatherData(data)
          setTemperature(Math.floor(data.current.temperature_2m))
        })
        .catch(err => {
          setError("No location found. Please check your input and try again.")
        })
    }

    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=10&language=en&format=json`, options)
      .then(response => response.json())
      .then(data => {
        setapiLocationName(data.results[0].name)
        setLatitude(data.results[0].latitude)
        setLongitude(data.results[0].longitude)
      }).then(() => {
        getWeather()
      })
      .catch(err => {
        setError("No location found. Please check your input and try again.")
      })

    
  }, [location, latitude, longitude])

  return (
    <>
      <main>
        <div className="container mx-auto">
          <form onSubmit={handleSubmit}>
            <input type="text" id="location-search" placeholder="Search for location..." ref={inputLocation} className="" />
            <button className="bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white">
              Submit
            </button>
            <div>{apiLocationName}, {latitude}, {longitude}, temp: {temperature}</div>
          </form>

          <Temperature temperature={temperature} />
          
          {weatherData && (
            <div>
              <h2>Weather Data:</h2>
              <pre>{JSON.stringify(weatherData, null, 2)}</pre>
            </div>
          )}
          {error && <label htmlFor="location-search" className="error">{error}</label>}
        </div>
        
      </main>
    </>
  )
}

export default App