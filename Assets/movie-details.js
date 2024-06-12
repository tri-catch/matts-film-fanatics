const urlParams = new URLSearchParams(window.location.search);
const movieID = urlParams.get('movieID');
const max_items = 5;
let movie_source_ids = [];
let index = 0;

if (movieID != null) {
    getMovieDetails(movieID);
        // .then(() => {
        //     movie_source_ids.forEach((x) => {
        //         console.log(x);
        //         console.log(index);
        //         getSourceDetails(x, index);
        //         index++;

        //     })
        // });
}


 function getMovieDetails(movieID) {
    return fetch(`https://api.watchmode.com/v1/title/${movieID}/details/?apiKey=PoPpueTmuKQ7Hp6eq8RqANw6C7GDgoJHx2QMzydl&append_to_response=plot,sources`)
        .then(response => response.json())
        .then(data => {
            const movieDetailsElement = document.getElementById('movie-details');
            let movieDetails =
            `
            <h2 class="flex justify-center text-5xl font-bold mt-5 mb-5">
                ${data.title}
            </h2>

            <p>
                <div class="text-2xl ml-10 mr-10 mt-12 mb-2">
                    <strong style="color: #38bdf8;">Plot:</strong> ${data.plot_overview}
                </div>
            </p>

            <p>
                <div class="text-2xl ml-10 mr-10 mt-12 mb-2">
                    <strong style="color: #38bdf8;">Sources:</strong>
                    <ul>`
                    for (let i = 0; (i < data.sources.length && i < max_items); i++) {
                        movieDetails += 
                        `<a href="${data.sources[i].web_url}">
                        <li class="mt-2 mb-2" id="movie-source-${i}">${data.sources[i].name}</li>
                        </a>`
                        movie_source_ids = movie_source_ids.concat(data.sources[i].source_id);
                    }
                    movieDetails +=
                    `</ul>
                </div>
            </p>`

            movieDetailsElement.innerHTML = movieDetails;
        })
        .catch(error => {
            console.error('Error fetching movie details:', error);
        });
}

function getSourceDetails(source_id, index) {
    return fetch(`https://api.watchmode.com/v1/sources/${source_id}?apiKey=PoPpueTmuKQ7Hp6eq8RqANw6C7GDgoJHx2QMzydl`)
        .then(response => response.json())
        .then(data => {
            console.log(`https://api.watchmode.com/v1/sources/${source_id}?apiKey=PoPpueTmuKQ7Hp6eq8RqANw6C7GDgoJHx2QMzydl`);
            const elementId = `movie-source-${index}`
            console.log(elementId);
            const sourceDetailsElement = document.getElementById(elementId);
            console.log(sourceDetailsElement);
            let sourceDetails = 
            `
                <h1>${data.name}</h1>
            `;

            sourceDetailsElement.innerHTML += sourceDetails;
        })
        .catch(error => {
            console.error('Error fetching movie details:', error);
        });
}