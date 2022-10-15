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

// function showLoad() {
//     document.querySelector('.search__bar input').addEventListener('change', loading);
//     document.querySelector('.fa-magnifying-glass').addEventListener('click', loading);
// }

// function hideLoad() {
//     document.querySelector('.search__bar input').removeEventListener('change', loading);
//     document.querySelector('.fa-magnifying-glass').removeEventListener('click', loading);
// }

// function loading() {
//     return resultsElem.innerHTML = `
//         <div class ="loading">
//             <i class="fa-solid fa-spinner"></i>
//         </div>
//     `
// }

const resultsElem = document.querySelector('#results');

async function searchMovie(event) {
    const searched = event.target.value;
    if (!!searched) {
        const response = await fetch(`http://www.omdbapi.com/?apikey=6f07cddd&s=${searched}`);        
        const data = await response.json();
        if (data.Response !== 'False') {
            const movies = data.Search.slice(0, 6);
            return resultsElem.innerHTML = movies.map(value => movie(value)).join("");
        }
        else {
            return resultsElem.innerHTML = '<h3 class="msg">Error. Search something else. !!</h3>'
        }
    }
    return resultsElem.innerHTML = '<h3 class="msg">Search something to show results !!</h3>'
}

function searchMovie2() {
    return searchMovie();
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