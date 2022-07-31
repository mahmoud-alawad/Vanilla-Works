const input  = document.getElementById('input');
const btn  = document.querySelector('.search-btn');
const moviesContainer  = document.querySelector('.movies-container');
const resultsList = document.querySelector('.resultsList');

const API_KEY = 'bed57bace403c25c78cbb5feeae4afd5';
const API_URL = 'https://api.themoviedb.org/3/search/movie?api_key=bed57bace403c25c78cbb5feeae4afd5';
 const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
//fetch api
function seaerchShow(query) {
    const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=bed57bace403c25c78cbb5feeae4afd5&query=${query}`;

    fetch(API_URL) 
    .then((response)=>{ 
    return response.json();
    })

    .then((jsonData)=>{
        let movie = jsonData.results; //array
        console.log(jsonData);
        const results = movie.map(element => element.title);
        const resultsImage = movie.map(element => element.poster_path);
       
        showResults(results, resultsImage);
        
    });
}
//input search and btn
window.onload = function () {
    input.onkeyup = (event)=> {
       
        if (input.value === '') {
            console.log('ehhh');
            clearSearch();
            
        }else{
            seaerchShow(input.value);
        }
    }
    btn.addEventListener('click', ()=>{
        seaerchShow(input.value);
    });
}

// show results

function showResults(results, image) {

    resultsList.innerHTML = '';

    results.forEach(result => {
        let listTitle = document.createElement('p');
        listTitle.innerText =  result;
        resultsList.appendChild(listTitle);
    }); 



    image.forEach(item => {
        let listImage = document.createElement('img');
        listImage.src = IMG_PATH + item;
        console.log(listImage);
        moviesContainer.appendChild(listImage);
        console.log(item);
        if (listImage === null) {
            this.remove();
        }
    });
}

// clear the result
function clearSearch() {
    resultsList.innerHTML = '';
    moviesContainer.innerHTML  = '';
}


