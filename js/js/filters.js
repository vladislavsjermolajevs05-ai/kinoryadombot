document.getElementById("searchBtn").onclick = searchMovie;

async function initApp(){
  await fetchGenres();
  const sections = [
    {url: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ru-RU&page=1`, container:"popularCarousel", type:"movie"},
    {url: `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=ru-RU&page=1`, container:"seriesCarousel", type:"tv"},
    {url: `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ru-RU&page=1`, container:"newCarousel", type:"movie"},
  ];

  await Promise.all(sections.map(async s=>{
    const movies = await fetchSection(s.url, s.type);
    displayMovies(movies, s.container, s.type);
  }));
  generateFilters();
}
initApp();

// ... Остальной код main.js: displayMovies, openDescription, closeDescription, watchTrailer, favorites, history
