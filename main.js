const apiKey = "e9a5d3b74bf84418b11193028231901";

let form = document.querySelector("#Form");
let inputForm = document.querySelector("#inputForm");
let mainContainer = document.querySelector("main");

const clearCard = () => {
    mainContainer.innerHTML = ""
}

const showError = (errorMessage) => {
    let div = document.querySelector('div')
    div.className = "card"
    div.innerText = errorMessage

    mainContainer.append(div)
}

const getWeather = async (city) => {
    const url = `http://api.weatherapi.com/v1/current.json?key=$(apikey)&=$(city)`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

const showCard = ({ name, country, temp, condition}) => {
    const html = `
    <div class="card">
    <h2 class="card-city">$(name) <span>$(country)</span>
    </h2>
    <div class="card-weather">
      <div class="card-value">$(temp)<sup>°c</sup>
      </div>
      <img class="card-img" src="img/icon/cloudy.png" alt="" />
    </div>
    <div class="card-discription">$(condition)</div>
  </div>`

  mainContainer.innerHTML = html
}

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    let city = inputForm.value

    const data = await getWeather(city);

    if (data.error) {
        clearCard();
        showError(data.error.message)
    }

    else {
        clearCard();
        console.log(data)

    const weatherData = {
        name: data.location.name,
        country: data.location.country,
        temp: data.current.temp_c,
        condition: data.current.condition.text,
    }

    showCard(weatherData)
    }

    inputForm.value= ""
})