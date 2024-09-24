import React from "react"
import { WeatherSvg } from "weather-icons-animated";

function Temperature( {temperature, locationname, windspeed} ) {
    
    const currentTemperature = (temp) => {
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
                <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">{locationname}</h2>
                <span className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">{currentTemperature(temperature)}<sup>°</sup></span>
              </div>
              Current Windspeed: {windspeed}MP/H
          </div>
        )}
      </>
    )
}

export default Temperature