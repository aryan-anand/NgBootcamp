// api key
const api = {
    key: "d451471946007feec8c85d93e039dd0a",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  
  
  //search 
  const searchbox = document.querySelector('.search-box');
  searchbox.addEventListener('keypress', setQuery);
  
  function setQuery(evt) {
    if (evt.keyCode == 13) {
      getResults(searchbox.value);
    }
  }
  
  
  
  //api calls for data
  function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(weather => {
        return weather.json();
      }).then(displayResults);
  }
  
  
  
  
  //weather and data change 
  function displayResults (weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
  
  
    //dateBuilder
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
  
  
    //temp
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
    
    //weather 
    let weather_eg = document.querySelector('.current .weather');
    weather_eg.innerText = weather.weather[0].main;
  
  
    //temp high and low 
    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.floor(weather.main.temp_min)}°c / ${Math.ceil(weather.main.temp_max)}°c`;
  }
  
  
  
  
  //date 
  function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }