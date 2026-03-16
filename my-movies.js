const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDc0OTdkMmVhMTg4ODgzMWRlOTgzZTY3MjFlNzcxOSIsIm5iZiI6MTc3MzMwNzU1MC42MDQsInN1YiI6IjY5YjI4NjllNDYwNGZhYzNjNzRlZmJhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Vmf_pWhXeE465Jzmk3i96jPQL5nJtnNwIQCXzdtf1vc'
    }
}
const apiKey = "547497d2ea1888831de983e6721e7719";
const baseImgUrl = "http://image.tmdb.org/t/p";
const nowShowingUrl = "https://api.themoviedb.org/3/movie/now_playing";
const popularUrl = "https://api.themoviedb.org/3/movie/popular";
const nowBoxDom = document.querySelector("#now-showing-movie-box");
const popularBoxDom = document.querySelector("#popular-movie-box");

fetch('https://api.themoviedb.org/3/configuration', options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err));
fetch('https://api.themoviedb.org/3/movie/now_playing', options)
    .then(res => res.json())
    .then((data) => {
        displayNowShowing(data)
        console.log(data)
    })
fetch('https://api.themoviedb.org/3/movie/popular', options)
    .then(res => res.json())
    .then((data) => {
        displayPopular(data)
        console.log(data)
    })
fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));
/*
async function fetchPopular() {
    const popularMovieFetch = await fetch('https://api.themoviedb.org/3/movie/popular', options)
    const genreFetch = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
    .then((data) => {
        displayPopular(data)
        console.log(data)
    })
} */

function displayNowShowing(data) {
    const results = data.results
    const nowString = results.map((result) => {
        const {id, title, poster_path, vote_average} = result
        return /*html*/ `
        <li>
            <article class="now-movie-card">
                <img src="${baseImgUrl}/w185${poster_path}" alt="${title} poster">
                <h3>${title}</h3>
                <p class="rating">
                    <span class="star">
                        <svg></svg>
                    </span>
                    ${vote_average}/10 IMDb
                </p>
            </article>
            <a href="detail.html?id=${id}&url=${nowShowingUrl}&title=${title}"></a>
        </li>`
    }).join("")
    nowBoxDom.insertAdjacentHTML("beforeend", nowString)
}

function displayPopular(data) {
    const results = data.results
    const popularString = results.map((result) => {
        const {id, genre_ids, title, vote_average, poster_path} = result
        return /*html*/ `
        <li>
            <article class="popular-movie-card">
                <img src="${baseImgUrl}/w92${poster_path}" alt="${title} poster">
                <h3>${title}</h3>
                <p class="rating">
                    <span class="star">
                        <svg></svg>
                    </span>
                    ${vote_average}/10 IMDb
                </p>
                <ul class="genre-list">
                    <li>${genre_ids}</li>
                </ul>
                <p class="length"></p>
            </article>
            <a href="detail.html?id=${id}&url=${popularUrl}&title=${title}"></a>
        </li>`
    }).join("")
    popularBoxDom.insertAdjacentHTML("beforeend", popularString)
}