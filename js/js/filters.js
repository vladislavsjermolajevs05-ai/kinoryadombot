function generateFilters(){
  const genreSet=new Set();
  const yearSet=new Set();
  allMovies.forEach(m=>{
    (m.genre_ids||[]).forEach(g=>genreSet.add(g));
    const year=(m.release_date||m.first_air_date||"").split("-")[0];
    if(year) yearSet.add(year);
  });

  const genreSelect=document.getElementById("genreFilter");
  genreSelect.innerHTML='<option value="">Все жанры</option>';
  Array.from(genreSet).sort((a,b)=>genresMap[a].localeCompare(genresMap[b])).forEach(g=>{
    const opt=document.createElement("option"); opt.value=g; opt.textContent=genresMap[g]; genreSelect.appendChild(opt);
  });

  const yearSelect=document.getElementById("yearFilter");
  yearSelect.innerHTML='<option value="">Все годы</option>';
  Array.from(yearSet).sort((a,b)=>b-a).forEach(y=>{
    const opt=document.createElement("option"); opt.value=y; opt.textContent=y; yearSelect.appendChild(opt);
  });
}

function applyFilters(){
  const g=document.getElementById("genreFilter").value;
  const y=document.getElementById("yearFilter").value;
  const r=document.getElementById("ratingFilter").value;

  ["popularCarousel","seriesCarousel","newCarousel"].forEach(cid=>{
    const container=document.getElementById(cid);
    Array.from(container.children).forEach(card=>{
      let show=true;
      if(g && !card.dataset.genres.split(",").includes(g)) show=false;
      if(y && card.dataset.year!==y) show=false;
      if(r && parseFloat(card.dataset.rating)<r) show=false;
      card.style.display=show?"block":"none";
    });
  });
}

["genreFilter","yearFilter","ratingFilter"].forEach(fid=>{
  document.getElementById(fid).onchange=applyFilters;
});
