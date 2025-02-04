const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=120737b6c47965cfd26124583f33c7d3&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=120737b6c47965cfd26124583f33c7d3&query="';

const DETAILS_API = 'https://api.themoviedb.org/3/movie/550?api_key=120737b6c47965cfd26124583f33c7d3';



const PLACEHOLDER_IMG = 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?q=80&w=1728&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.querySelector(".search-input");
const searchButton = document.querySelector(".js-search-button");  
const resetButton = document.querySelector(".js-reset-search-button");

getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    let { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    // set cases to swap out unavailable data
    if (overview === "") overview += "No overview available";
    vote_average = vote_average.toFixed(1);

    movieEl.innerHTML = `
		<img
				src="${IMG_PATH + poster_path}"
				alt="${title} Poster Art"
				onerror="this.src='${PLACEHOLDER_IMG}'" 
				width="1280"
				height="1920">
				<div class="rating-container">
					<div class="rating ${getClassByRating(vote_average)}">${vote_average}%</div>
				</div>
			<div class="overview">
						<div class="movie-info">
				<h3>${title}</h3>
        </div>
				<h3>Overview</h3>
				<p>${overview}</p>
			</div>
		`;

    main.appendChild(movieEl);
  });
}

function getClassByRating(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (search.value === "") {
    alert("Please enter a search term");
    return;
  }

  if (searchTerm && searchTerm !== "") {
    getMovies(`${SEARCH_API}${searchTerm}"`);

    search.value = "";
    toggleSearchButton(true);
    toggleResetButton(false);
  } else {
    window.location.reload();
  }
});

function toggleSearchButton(shouldHide) {
  searchButton.classList.toggle("hidden", shouldHide);
} 


function toggleResetButton(shouldHide) {
  resetButton.classList.toggle("hidden", shouldHide);
  if (!shouldHide) {
    resetButton.addEventListener("click", resetFilms);
  } else {
    resetButton.removeEventListener("click", resetFilms);
  }
}

function resetFilms() {
  window.location.reload();
}
