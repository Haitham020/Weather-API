const apiKey = "0871717ae80370b468f7f57964c654eb";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")

const weatherIcon = document.querySelector(".weather-icon")
const weather = document.querySelector(".weather")

const error = document.querySelector(".invalid");

const condition = document.querySelector(".condition")



////////////////////////////////////////////////////
async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`)
    let data = await response.json();

    if(response.status == 404 ){
        error.style.display = "block";
        weather.style.display = "none"
    }
    else {
        error.style.display ="none"
    }

    condition.innerHTML = data.weather[0].description;
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + " °C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
    document.querySelector(".wind").innerHTML = data.wind.speed + " KM/H";

    if(data.weather[0].main == "Clouds") {
        weatherIcon.src = "weather images/clouds.png";     
    }
    else if(data.weather[0].main == "Clear") {
        weatherIcon.src = "weather images/clear.png"; 
    }
    else if(data.weather[0].main == "Rainy") {
        weatherIcon.src = "weather images/rainy.png";
    }
    else if(data.weather[0].main == "Drizzle") {
        weatherIcon.src = "weather images/drizzle.png";
    }
    else if(data.weather[0].main == "Mist") {
        weatherIcon.src = "weather images/mist.png";
    }
    // else if(data.weather[0].main == "Snowy") {
    //     weatherIcon.src = "weather images/snow.png" ;
    // }


    weather.style.display = "block";



}

searchBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      searchBtn.click(event);
      
    }
    
});

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value); 
})


const suggestionsList = document.getElementById("suggestions");

        // Countires and cities:
const suggestionsData = [
];

// Function to filter and display suggestions
function displaySuggestions() {
    const searchTerm = searchBox.value.toLowerCase();
    const filteredSuggestions = suggestionsData.filter(item => item.toLowerCase().includes(searchTerm));

    // Clear previous suggestions
    suggestionsList.innerHTML = '';

    // Add filtered suggestions to the list
    filteredSuggestions.forEach(suggestion => {
        const li = document.createElement('li');
        li.textContent = suggestion;
        li.addEventListener('click', () => {
            searchBox.value = suggestion;
            suggestionsList.innerHTML = '';
        });
        suggestionsList.appendChild(li);
    });
}



// Event listener for input changes
searchBox.addEventListener('input', displaySuggestions);






checkWeather();

