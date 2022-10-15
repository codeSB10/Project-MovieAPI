/*  API - http://www.omdbapi.com/?apikey=[yourkey]& 
    My key - 6f07cddd
    
    => "http://www.omdbapi.com/?apikey=6f07cddd& "
*/

function openMenu() {
    document.body.classList += " menu--open"
}

function closeMenu() {
    document.body.classList.remove("menu--open");
}

function loading() {
    return resultsElem.innerHTML = `
        <div class ="loading">
            <i class="fa-solid fa-spinner"></i>
        </div>
    `
}

function movie(value) {
    return `
        <div class="movie">
            <img src="${value.Poster}" alt="Poster">
            <div class="movie__desc">
                <h2>${value.Title}</h2>
                <p>Year : ${value.Year}</p>
            </div>
        </div>
    `
}

const resultsElem = document.querySelector('#results');

async function searchMovie(event) {
    const searched = event.target.value;
    if (!!searched) {
        loading();
        const response = await fetch(`http://www.omdbapi.com/?apikey=6f07cddd&s=${searched}`);
        const data = await response.json();
        setTimeout(() => {
            if (data.Response !== 'False') {
                const movies = data.Search.slice(0, 6);
                return resultsElem.innerHTML = movies.map(value => movie(value)).join("");
            }
            else {
                return resultsElem.innerHTML = '<h3 class="msg">Error. Search something else. !!</h3>'
            }
        }, 1000);
    }
    else {
        return resultsElem.innerHTML = '<h3 class="msg">Search something to show results !!</h3>'
    }
}