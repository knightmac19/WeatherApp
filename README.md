# WeatherApp
https://knightmac19.github.io/WeatherApp/

## User-Story
- AS A traveler
- I WANT TO know what the weather will be where I am going
- SO THAT I can pack and prepare accordingly 

## Description

Knowing what the weather will be like allows people to prepare. And this application helps inform users of the weather all across the globe.

When a user first ventures onto the site they are greeted by a "Search for a city" label above an input box. After entering a valid city and a) hitting 'enter' or b) clicking the search icon, content is dynamically added to the screen.

After every search the application pushes the user's query into an array of cities in local storage. Then a button is prepended onto the screen with the value of a query. At the same time forecast content for the city in question appears on the screen. Below the daily report appear a row of 5 columns, giving the user a 5-day forecast for the searched city. 

The application makes several API calls to https://openwweathermap.org for the various data. The application also uses the Moment.js library to provide the relative dates in the 5-day forecast query to the openweathermap.org's API. 

### Screenshots

![alt_text](https://github.com/knightmac19/WeatherApp/blob/master/WeatherDashboard1.png)

![alt_text](https://github.com/knightmac19/WeatherApp/blob/master/WeatherDashboard2.png)

![alt_text](https://github.com/knightmac19/WeatherApp/blob/master/WeatherDashboard3.png)

![alt_text](https://github.com/knightmac19/WeatherApp/blob/master/WeatherDashboard5.png)

### Tutorials / Resources

- https://www.youtube.com/watch?v=IfG4A8YfxsY
- https://openweathermap.org/current
- https://openweathermap.org/weather-conditions
- https://openweathermap.org/forecast5