# Weather Checker App

A simple React app to check weather status given a location name or ZIP.

## Installation

Copy down the repository and run `npm install` to install all local dependencies.

To run the project, run `npm run start`.

To run the local component tests, run `npm test`.

To build the application, run `npm run build`.

## Dependencies

- React
- Tailwind
- [weather-icons-animated](https://www.npmjs.com/package/weather-icons-animated)

## APIs

- [Geocoding](https://geocoding-api.open-meteo.com/)
- [Open Meteo](https://api.open-meteo.com/)

## Project Walkthrough

To begin, I pulled in Create React App and installed Tailwind CSS. I then began scaffolding a barebones front-end to serve the needs of the application.

The next steps were to create the basic API calls. As the Geolocation and Weather calls were separate services, I went with the async/await approach since the Weather call relied upon the result of the Geolocation call. Originally, I had written them to leverage useEffect but as that was causing unnecessary re-renders, I swapped them to standard handlers during a refactor.

The Geolocation service takes a location name or ZIP code as an input and returns a latitude and longitude which I then use as a parameter for the API call to the Weather service. From that point, I handled basic error handling and broke the search form and the return window into separate components. I wanted the search form component to be a controlled component so we could monitor the input state and do input validation on user input.

Once the user submits, it calls the Geolocation API with the location specified (city or ZIP) and returns the latitude and longitude. I can then use the helper function (handleWeather) to return the Weather data as an object which I can iterate to and managte as a state. I pass in the Weather data to the Searchbar component and destructure the data and then return the properties on the front end.

## Potential Enhancements

- Autocomplete library for search bar
- Use a different geocoding library as it doesn't accept state 2 letter codes (e.g. DE, PA)
- Further visualization for forecasted weather
