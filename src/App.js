import React from "react"
import { useState, useEffect, useRef } from "react"
import Temperature from "./Components/Temperature"


function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(null)
  const [location, setLocation] = useState(null)
  const [apiLocationName, setapiLocationName] = useState(null)
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [temperature, setTemperature] = useState(null)
  const [humidity, setHumidity] = useState(null)
  const [precipitation, setPrecipitation] = useState(null)
  const [windspeed, setWindspeed] = useState(null)
  const inputLocation = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    const locationValue = inputLocation.current.value
    setLocation(locationValue)
  }

  useEffect(() => {
    if (location) {
      const getWeather = () => {
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,rain,wind_speed_10m,wind_direction_10m&hourly=temperature_2m&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`, {method: 'GET', headers: { accept: 'application/json' }})
          .then(response => response.json())
          .then(data => {
            setWeatherData(data)
            setTemperature(Math.floor(data.current.temperature_2m))
            setWindspeed(data.current.wind_speed_10m)
            setHumidity(data.current.relative_humidity_2m)
            setPrecipitation(data.current.precipitation)
            setError(null)
          })
          .catch(err => {
            setError("No location found. Please check your input and try again.")
          })
      }
  
      fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=10&language=en&format=json`, {method: 'GET', headers: { accept: 'application/json' }})
        .then(response => response.json())
        .then(data => {
          setapiLocationName(data.results[0].name)
          setLatitude(data.results[0].latitude)
          setLongitude(data.results[0].longitude)
        }).then(() => {
          getWeather()
          setError(null)
        })
        .catch(err => {
          setError("No location found. Please check your input and try again.")
        })
    }
  }, [location, latitude, longitude])

  return (
    <>
      <main className="bg-gradient-to-b from-gray-700 to-gray-300 min-h-screen">
        <h1 className="sr-only">Weather Check Application</h1>
        <div className="container mx-auto">
          <section id="weather-container" className="p-5">
            <form onSubmit={handleSubmit} className="mb-5">
              <div className="form-control relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" id="location-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for the name of your city or state..." ref={inputLocation} />
                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
              </div>
              {error && (
                <div role="alert" className="mt-5">
                  <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                    Error
                  </div>
                  <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                    <label htmlFor="location-search" className="error">{error}</label>
                  </div>
                </div>
              )}
            </form>

            <Temperature temperature={temperature} locationname={apiLocationName} windspeed={windspeed} humidity={humidity} precipitation={precipitation} />
            
            {weatherData && (
              <div>
                <h2>Weather Data:</h2>
                <pre>{JSON.stringify(weatherData, null, 2)}</pre>
              </div>
            )}
          </section>
          
          
        </div>
        
      </main>
    </>
  )
}

export default App