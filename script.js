// `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`
// api.openweathermap.org/data/2.5/weather?q=tehran&appid=ee1dcd8d2754188fb3313c6edf10f82e$units = metric

const form = document.querySelector(".top-section form");
const input = document.querySelector(".top-section input");
const message = document.querySelector(".msg");
const list = document.querySelector(".cities");

const apiKey = "ee1dcd8d2754188fb3313c6edf10f82e";

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let inputValue = input.value;
    input.value = "";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const { name, main, weather, sys } = data;
            const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
            const li = document.createElement("li");
            li.classList.add("city");
            const markup = `
            <h2 class='city-name' data-name=${name},${sys.country}>
            <var>${name}</var>
            <sup>${sys.country}</sup>
            </h2>
            <div class='city-temp'>
            <var>${Math.round(main.temp)}</var>
            <sup> C°</sup>
            </div>
            <figure>
                <img class='city-icon' src='${icon}' alt = 'city'>
                <figcaption>${weather[0].description}</figcaption>
            </figure>
            `;
            li.innerHTML = markup;
            list.appendChild(li);
            message.innerText = "";
        })
        .catch(() => {
            message.innerText = "Search for a valid city...!";
        });
});