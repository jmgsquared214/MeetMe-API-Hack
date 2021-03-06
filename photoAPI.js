'use strict';

const photoSearchURL = "https://api.unsplash.com/search/photos";
const photoApiKey = "a579b05eb6be838537052ccfaa4d09934984e0e4afccd490edf207a1d935667d";


function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    //console.log(queryItems.join('&'));
    return queryItems.join('&');
}

function displayPhotos(responseJson) {
    const destination = $('.destination').val();
    $('.destinationPhotoList').empty();
    $('.destinationName').empty();
    //console.log(`${airportCodeData[destination]}`);
    $('.destinationName').append(`<h2>Ah, Beautiful ${airportCodeData[destination]}</h2>`);
    for (let i = 0; i < responseJson.results.length; i++) {
        $('.destinationPhotoList').append(
            `<li class="photo"><img src="${responseJson.results[i].urls.full}"</li>`
        )
    }
}

function getPhotos() {
    const destination = $('.destination').val();
    let currentDestination = airportCodeData[destination];
    for(let i=0; i < airportCodeData.length; i++) {
        for(value in airportCodeData[i]) {
            if(airportCodeData[i][value]==destination) {
                console.log('params store key working: ', airportCodeData[i][key]);
            }
        }
    }
    const params = {
        "client_id": photoApiKey,
        query: currentDestination,
        orientation: 'landscape',
        per_page: 5,
        "accept version": "v1"
    }
    const queryString = formatQueryParams(params);
    const url = photoSearchURL + '?' + queryString;
    //console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayPhotos(responseJson))
        .catch(error => alert('Photo API not working'));
}

function watchForm() {
    $('.flightSearchForm').submit(event => {
        event.preventDefault();
        getPhotos();
        console.log('Photo form is working');
    })
}

$(watchForm);