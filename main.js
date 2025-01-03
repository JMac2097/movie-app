const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=120737b6c47965cfd26124583f33c7d3&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=120737b6c47965cfd26124583f33c7d3&query="'

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovies(API_URL);


async function getMovies(url) {
	const res = await fetch(url);
	const data = await res.json();

	showMovies(data.results);
	
}

function showMovies(movies) {
	main.innerHTML = '';

	movies.forEach(movie => {
		const { title, poster_path, vote_average, overview } = movie;
		
	})

}


form.addEventListener('submit', e => {
	e.preventDefault();

	const searchTerm = search.value;

	if(searchTerm && searchTerm !== '') {
		getMovies(`${SEARCH_API}${searchTerm}"`)

		search.value = '';
	} else {
		window.location.reload();
	}
})