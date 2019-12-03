
// const queryURL =
// const APIKey = 

$("#search-button").on("click", function (event) {
    event.preventDefault();

    const value = $("#user-input").val();
    // Get array of values from local storage; if array doesn't exist, create a blank array.
    const history = JSON.parse(localStorage.getItem("history")) || [];
    // Push user input into this copy of the history array.
    history.push(value);
    // Set existing history with the new array we created.
    localStorage.setItem("history", JSON.stringify(history));

    makeBootstrapCard(value);
    // Append that bootstrap card to the page

    const userInput = document.getElementById("user-input").value;
    console.log(userInput)
    const APIKey = "&appid=ef2e34e235b9c5156c08f25db07cfa7a"
    const queryURL = "https://api.openweathermap.org/data/2.5/find?q=" + userInput + "&units=imperial" + APIKey;


    axios.get(queryURL)
        .then(function (response) {
            console.log(queryURL);
            console.log(response);
            document.getElementById("current-temp").innerHTML = "Temperature (F): " + response.data.list[0].main.temp;
            document.getElementById("current-humidity").innerHTML = "Humidity: " + response.data.list[0].main.humidity;
            document.getElementById("windspeed").innerHTML = "Wind Speed: " + response.data.list[0].wind.speed;
           // document.getElementById("uv-index").innerHTML = "UV Index: " + response.data.list[0].main.temp;




        });
});

// Make new bootstrap card with user input
function makeBootstrapCard(value) {
    const card = $("<div>").addClass("card");
    const cardBody = $("<div>").addClass("card-body");
    const cardTitle = $("<h5>")
        .addClass("card-title")
        .text("Search History");
    const cardText = $("<p>")
        .addClass("card-text")
        .text(value);

    // Merge and add created element.
    cardBody.append(cardTitle, cardText);
    card.append(cardBody);

    // Target div where I want to add card and append to page.
    $("#search-history").append(card);
}

function displayHistory() {
    const history = JSON.parse(localStorage.getItem("history"));

    if (history && history.length > 0) {
        for (let i = 0; i < history.length; i++) {
            makeBootstrapCard(history[i]);
        }
    }
}

displayHistory();