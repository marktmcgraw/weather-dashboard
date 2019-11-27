const userInput = document.getElementById("user-input").value;
const APIKey = "&APPID=ef2e34e235b9c5156c08f25db07cfa7a";
let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + APIKey;

// api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=ef2e34e235b9c5156c08f25db07cfa7a

axios.get(queryURL)
.then(function(response){
    console.log(queryURL);
    console.log(response);
    document.getElementById("search-results").innerHTML = JSON.stringify(response);

 });




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