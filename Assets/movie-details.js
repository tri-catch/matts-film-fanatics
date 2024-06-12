const urlParams = new URLSearchParams(window.location.search);
const movieID = urlParams.get('movieID');
const maxItems = 5;

if (movieID !== null) {
    fetchMovieDetails(movieID);
}

function fetchMovieDetails(movieID) {
    const apiKey = 'PoPpueTmuKQ7Hp6eq8RqANw6C7GDgoJHx2QMzydl';
    const url = `https://api.watchmode.com/v1/title/${movieID}/details/?apiKey=${apiKey}&append_to_response=plot,sources`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const movieDetailsHTML = createMovieDetailsHTML(data);
            updateDOM('movie-details', movieDetailsHTML);
        })
        .catch(error => {
            console.error('Error fetching movie details:', error);
        });
}

function createMovieDetailsHTML(data) {
    let sourcesHTML = data.sources.slice(0, maxItems).map((source) => {
        return `
            <a href="${source.web_url}">
                <li class="mt-2 mb-2">${source.name}</li>
            </a>`;
    }).join('');

    return `
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
                <ul>${sourcesHTML}</ul>
            </div>
        </p>`;
}

function updateDOM(elementId, html) {
    document.getElementById(elementId).innerHTML = html;
}