import React from "react"
import { WeatherSvg } from "weather-icons-animated";

function Temperature( {temperature, locationname, windspeed, humidity, precipitation, apparenttemperature} ) {
    
    const currentTemperature = (temp) => {
      // can be expanded to include more weather states for more icons
      switch(true) {
        case (temp >= 70):
          return <><WeatherSvg className="inline" state="sunny" width={50} height={50} /> {temp}</>
        case (temp <= 35):
          return <><WeatherSvg className="inline" state="snowy" width={50} height={50} /> {temp}</>
        default:
          return <><WeatherSvg className="inline" state="sunny" width={50} height={50} /> {temp}</>
      }
    }

    return (
      <>
        {temperature && (
          <div className="weather-details bg-slate-100 p-5 border-gray-300 rounded-lg drop-shadow">
              <div className="flex justify-between">
                <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white"><span className="sr-only">Weather for </span>{locationname}</h2>
                <span className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white"><span className="sr-only">Current temperature is </span>{currentTemperature(temperature)}<sup>°</sup></span>
              </div>

              <div className="border-b-slate-300 border-b py-3">
                <p className="flex justify-between"><span><strong>Feels Like:</strong></span><span>{apparenttemperature} <sup>°</sup></span></p>
              </div>

              <div className="border-b-slate-300 border-b py-3">
                <p className="flex justify-between"><span><strong>Current Windspeed:</strong></span> <span>{windspeed} MP/H</span></p>
              </div>

              <div className="border-b-slate-300 border-b py-3">
                <p className="flex justify-between"><span><strong>Current Humidity:</strong></span> <span>{humidity}%</span></p>
              </div>

              <div className="py-3">
                <p className="flex justify-between"><span><strong>Current Precipitation:</strong></span> <span>{precipitation}%</span></p>
              </div>
          </div>
        )}
      </>
    )
}

export default Temperature