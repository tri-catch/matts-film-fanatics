const apiKey = "d254f211"
const apiKey2 = "s7V7ouDr0KAENqnahUeSndhy5at0c5ITRnzhjkaa"


const searchButton = document.querySelector(".btn")


function navigateToSecondPage(movieID) {
    const secondPageLink = document.getElementById('second-page-link');
    secondPageLink.href = `second_page.html?movieID=${movieID}`;
    secondPageLink.click();
}

function searchMovie(movie) {
    fetch(

        `http://www.omdbapi.com/?s=${movie}&apikey=651c5a7f`
    ).then(function (response) {
        return response.json();
    }).then(function (data) {

        console.log(data)
        for (let i = 0; i < data.Search.length; i++) {
            renderResult(data.Search[i])
        }
    });


}

const render = document.querySelector(".movie-area")


searchButton.addEventListener("click", function (event) {
    event.preventDefault()
    const movie = document.querySelector("#input-box").value
    updateSearchHistory(movie)
    searchMovie(movie)

})

function updateSearchHistory(movie) {

    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];


    searchHistory.push(movie);


    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));


    displaySearchHistory();
}

function displaySearchHistory() {
    const searchHistoryContainer = document.getElementById('search-history');
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    searchHistoryContainer.innerHTML = '<h2>Search History:</h2>';
    searchHistoryContainer.innerHTML += '<ul>' + searchHistory.map(movie => `<li>${movie}</li>`).join('') + '</ul>';

}
function renderResult(movie) {
    const result = document.createElement("div");
    const todaysMovie = `
            <div>
                <h3>Title: ${movie.Title}</h3>
                <p>Year: ${movie.Year}</p>
                <a href="./movie-details.html?movieID=${movie.imdbID}">
                    <img src="${movie.Poster}" alt="${movie.Title} Poster"/>
                </a>
            </div>
        `;
    result.innerHTML = todaysMovie;
    const render = document.querySelector(".movie-area");
    render.append(result);
}


displaySearchHistory();

function getWhereStream(movieId) {
    fetch(

        `https://api.watchmode.com/v1/title/${movieId}/details/?apiKey=s7V7ouDr0KAENqnahUeSndhy5at0c5ITRnzhjkaa&append_to_response=sources`

    )

}