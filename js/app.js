$(document).ready(()=>{
    $("#search-form").on("submit", (e)=>{
        e.preventDefault();
        const searchValue = $("#search-text").val();
        getMovies(searchValue);
    })
})




async function getMovies (searchText) {
    $("#movies").html("");
    const response = await axios.get(`http://www.omdbapi.com/?apikey=54d369cc&s=${searchText}`);
    console.log(response);
    const moviesData = response.data;
    if(moviesData.Response!=="False")
    {
        $.each(moviesData.Search, (index, value)=>{
            $("#movies").append(`
            <div class="col-lg-3 col-md-6 my-4 justify-item-center text-center">
            <img src="${value.Poster}" alt="" class="movie-poster">
            <div class="details text-center">
                <h5 class="text-center">${value.Title}</h5>
                <a onClick="movieSelected('${value.imdbID}')" class="btn btn-primary">Movie Details</a>
            </div>
        </div>`)
        })
    }
    else 
    {
         $("#movies").append(`<h2 class="text-center" id="error">Movies Not Found</h2>`);
    }
}

async function movieSelected (id) {
    sessionStorage.setItem("movieId", id);
    window.location = "movie.html"
    return false;
}

async function getMovie () {
    const movieId = sessionStorage.getItem("movieId");
    const response = await axios.get(`http://www.omdbapi.com/?apikey=54d369cc&i=${movieId}`);
    console.log(response);

    const {Poster, Genre, Released, Director, Actors, Language, imdbRating, imdbID} = response.data;
    $("#movie").append(` <div class="movie-detail">
    <div class="row">
   <div class="col-lg-3">
        <img src="${Poster}" alt="poster" class="thumbnail">
   </div>
   <div class="col-lg-9">
    <div class="movie-detail">
        <h3>Home Alone</h3>
        <ul class="list-group">
            <li class="list-group-item"><strong>Genre :</strong> ${Genre}  </li>
            <li class="list-group-item"><strong>Released : </strong> ${Released}</li>
            <li class="list-group-item"><strong>Director : </strong> ${Director}</li>
            <li class="list-group-item"><strong>Actors : </strong> ${Actors}</li>
            <li class="list-group-item"><strong>Language : </strong> ${Language}</li>
            <li class="list-group-item"><strong>imdb Rating : </strong> ${imdbRating}</li>
        </ul>
       
    </div>
   </div>
   </div>
   <div class="py-3 my-2 pr-4">
    <h3>Plot</h3>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe quis ad libero cum numquam voluptate voluptates et quisquam odit! Placeat, quos? Nihil, eos quibusdam eveniet odio aperiam consectetur voluptatum esse.</p>
    
    <div class="input-group">
            <a href="https://www.imdb.com/title/${imdbID}" target="_blank" class="btn btn-primary" type="button" aria-label="">Go to IMDB page</a>
      <a class="btn btn-secondary mx-3" href="index.html" type="button" aria-label="">Go to the search page</a>

    </div>
</div>
</div>`)
    
}