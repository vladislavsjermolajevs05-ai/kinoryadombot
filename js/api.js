const API_KEY="1ea789320e9a8e2b6a8239e9620efd28";
let allMovies = [];
let genresMap = {};

async function fetchGenres(){
  const movieGenres = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=ru-RU`).then(r=>r.json());
  const tvGenres = await fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=ru-RU`).then(r=>r.json());
  movieGenres.genres.forEach(g=>genresMap[g.id]=g.name);
  tvGenres.genres.forEach(g=>genresMap[g.id]=g.name);
}

async function fetchSection(url, type){
  const data = await fetch(url).then(r=>r.json());
  data.results.forEach(m=>{ m.type=type; allMovies.push(m); });
  return data.results;
}
