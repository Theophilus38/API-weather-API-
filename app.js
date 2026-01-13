

const form = document.querySelector("#weatherForm")
const searchInput = document.querySelector("#searchinput")
const button = document.querySelector("button")
const ul = document.querySelector("ul")
const error = document.createElement("P")
const section = document.querySelector(".sec")
const goBackButton = document.createElement("button")
goBackButton.textContent = "Go Back"

    form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const cont = document.querySelector(".cont")
    const content = document.querySelector(".content")
    section.style.display = "none"
    cont.style.display = "block"
    ul.innerHTML = ""
    error.innerHTML = ""
    try {
    searchQuery = form.firstElementChild.value
    const config = { params: { q: searchQuery } }
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=2fcac265b99af4a195d2d70bc02a9fd3&units=metric`, config)
    const list = document.createElement("li")
    ul.append(list)
    ul.insertAdjacentElement("afterend", goBackButton)
    const temperature = `The current Temperature of ${searchQuery} is: ${response.data.main.temp}, current Humidity is: ${response.data.main.humidity}, weather description is: ${response.data.weather[0].description}`
    list.append(temperature)
    form.firstElementChild.value = ""
    } catch (e) {
        error.textContent = "NO CITY FOUND!!!"
        document.body.append(error)
        error.insertAdjacentElement("afterend", goBackButton)
        form.firstElementChild.value = ""  
    } finally {
        cont.style.display = "none"
        goBackButton.style.display = "block"
        //section.style.display = "block"
    }
})

goBackButton.addEventListener("click", () => {
    section.style.display = "block"
    ul.innerHTML = ""
    goBackButton.style.display = "none"
    error.innerHTML = ""
}) 