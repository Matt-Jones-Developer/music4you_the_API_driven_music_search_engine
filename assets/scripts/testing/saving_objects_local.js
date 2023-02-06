// I want to advance the local storage to save entire objects per card

// would we need to store the entire artist array?
// if we save the strings we need, could';t we artificially re-render the saved cards?

// data is received 
// turn into object with unique name and stored 
// on refresh - data objects are parsed and each item makes up the required data per card
// then have a re-render function that is now separate from the main (initial) renderCards() function?
// reRender() would simply take an item string, and textContent it to the correct card element?

// an object would contain:

// let artistObject = [

//   { artistName: 'dj shadow' },
//   { genre: 'hip-hop' },
//   { artwork: 'http://urltoimage.com' } // this must still be fetched though??

// ]

// // testing whether we can re-access the url without fetching 

// // get any stored objects
// artistObject = JSON.parse(localStorage.getItem('artistObject'));
// console.log('parsed objects: ', artistObject)
// if (artistObject === null) {
//   artistObject = {
//     artistName: '',
//     genre: '',
//     artwork: ''
//   };

//   artistObject.artistName = 0;
//   artistObject.genre = 0;
//   artistObject.artwork = 1;

//   // when we store to local
//   localStorage.setItem('artistObject', JSON.stringify(artistObject));
// } else {
// artistObject = JSON.parse(artistObject)

// }

// console.log(artistObject)

// this will only store it once; then it's null.

// must add new vars to store both 'what is already stored' and what needs to be parsed 
// 'storedArtistObject' and 'parsedArtistObject'

// also, to test this will work for multiple cards we need to make temp globals for object items - 
let artistNameData = 'testament'
let genreData = 'thrash metal'
let artworkData = 'https://i.discogs.com/hI43yrM9q3JZHI4LATi26oB-SZ_Sp-BkCs0YRtEPpkk/rs:fit/g:sm/q:90/h:415/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTEzNzEy/Ni0xNjQ5NzI4ODA1/LTI2NzUucG5n.jpeg'

// so these are being overwritten each time we change them - so a function needs to be created 
// that stores a new object EACH TIME the user searches an artist 

// an object array must be created for each artist saved 

// set a global for grid rendering 
const gridContainer = document.querySelector("#grid-container")

// if already stored, update it

// let artistObject = [
//   { artistName: 'dj shadow' },
//   { genre: 'hip-hop' },
//   { artwork: 'http://urltoimage.com' }
// ];

let artistObject = [
  { artistName: artistNameData},
  { genre: genreData },
  { artwork: artworkData }
];

// Get any stored objects
let storedArtistObject = localStorage.getItem('artistObject');
let parsedArtistObject = storedArtistObject ? JSON.parse(storedArtistObject) : null;

// If the object is not in local storage, store it
if (!parsedArtistObject) {
  localStorage.setItem('artistObject', JSON.stringify(artistObject));
} else {
  // Otherwise, update the stored object with the current value of artistObject
  parsedArtistObject = artistObject;
  localStorage.setItem('artistObject', JSON.stringify(parsedArtistObject));
}

console.log(JSON.parse(localStorage.getItem('artistObject')));

// ok, this works, now lets try to access each item using forEach

// function displayArtistObject(artistArray) {
//   for (let i = 0; i < artistArray.length; i++) {
//     console.log(artistArray[i]);

//     // define each item and give it an index?
//     let artistName = artistArray[i]
//     let genre = artistArray[i]
//     let artwork = artistArray[i]

//     console.log(artistName, genre, artwork)
//   }



//   // cool, now lets try to render a new card using the retrieved object items 
//   renderCard(artistArray)
// }

// displayArtistObject(artistObject);

// this creates them 3 times for each item!  we need to use hasOwnProperty to set a new variable for each item once only


// BUT! these vars are LOCAL - we need to add a new array that indexes them properly 
// allowing access from other functions via do notation! call array 'artistData'

function displayArtistObject(artistArray) {
  // define OUTSIDE the loop
  let artistData = {};

  for (let i = 0; i < artistArray.length; i++) {
    console.log(artistArray[i]);

    // define each item and give it an index
    let currentItem = artistArray[i];
    // let artistData = {};

    if (currentItem.hasOwnProperty('artistName')) {
      artistData.artistName = currentItem.artistName;
      console.log(artistData.artistName);
    }

    if (currentItem.hasOwnProperty('genre')) {
      artistData.genre = currentItem.genre;
      console.log(artistData.genre);
    }

    if (currentItem.hasOwnProperty('artwork')) {
      artistData.artwork = currentItem.artwork;
      console.log(artistData.artwork);
    }

    // console.log(artistData)

    // now do something with the variables - here will create 3 cards
    // renderCard(artistData);
  }

  // now do something with the variables - outside the for loop?
  // cannot access here though, since it's now out of scope!!

  // BECAUSE we put the new array INSIDE the loop!! Obvs 
  // this is now accessed as expected! Yay! 
  renderCard(artistData);
}

displayArtistObject(artistObject);


function renderCard(artistData) {

  // success!! Logs the array object
  console.log(artistData)

  // for each new artist - create a new card container
  const cardContainer = document.createElement("div")
  // set its class (card-cont?)
  cardContainer.classList.add("d-inline-flex");
  // add a fixed width and centered margin
  cardContainer.style = "width: 100%", "margin: 0 auto";

  // set a card index - may need to be global here?
  let index = 0;

  // when we remove card via indexing - remember to +1 to array index

  // create the card element
  const card = document.createElement("div");
  card.classList.add("card", "bg-dark", "m-3", "justify-content-center");
  // also add the cols
  card.classList.add("col-lg-3", "col-md-6", "col-sm-12");

  // set card attr and styling 
  card.setAttribute("data-name", artistData.artistName);
  card.setAttribute("data-index", ++index);
  // card.style.boxShadow = "var(--btn-shadow)";
  card.style.paddingTop = "3rem";
  // define a card size for pixel perfect
  card.style.width = "397px";
  card.style.height = "520px";

  // create card body
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  cardBody.style.textAlign = "center";

  // add title (artist name)
  const artistEl = document.createElement("h1");
  artistEl.classList.add("card-title");
  artistEl.textContent = `${artistData.artistName}`;
  // style here
  artistEl.style.fontSize = "34px";
  artistEl.style.letterSpacing = ".2rem";

  // add a genre label
  const genreEl = document.createElement("h3");
  genreEl.textContent = `${artistData.genre}`;
  // styling
  genreEl.style.fontSize = "18px";

  // add an image
  const albumArtEl = document.createElement("img");
  // specify src
  albumArtEl.src = `${artistData.artwork}`;
  // albumArtEl.src = `${randomImage}`
  albumArtEl.classList.add("album-img");
  // set the image size
  albumArtEl.style.width = "330px";
  albumArtEl.style.height = "310px";
  albumArtEl.style.paddingBottom = "1rem";
  albumArtEl.style.borderRadius = ".3rem";

  // go to page button
  const artistButton = document.createElement("button");
  artistButton.classList.add("btn");
  // must include an <a href> to the artist-page el !!
  // href=#templates/artists-page.html
  // artistButton.setAttribute('<a>', 'href="../templates/artists-page.html"');
  // how to add the full href to the a tag?
  artistButton.style.height = "2.3rem";
  artistButton.style.color = "#fff";
  artistButton.style.margin = "1rem";
  artistButton.textContent = "Artist Info";

  // new feature added! remove artist!
  const removeButton = document.createElement("button")
  removeButton.classList.add("btn", "btn-warning", "remove-card")
  removeButton.style.height = "2.3rem";
  removeButton.style.fontSize = '14px';
  removeButton.style.color = "#fff";
  removeButton.style.margin = "1rem";
  removeButton.textContent = "Remove";

  // // merging cogs genre with lastfm genre
  // let genreMixEl = genre + "/" + cogGenre;
  // // genreLabel.append(genreEl, cogGenreEl);

  // final card appends
  card.append(artistEl, genreEl); // genreEl for just lastFM or genreMixEl for both
  cardBody.appendChild(albumArtEl);
  cardBody.append(artistButton, removeButton)
  card.appendChild(cardBody);
  gridContainer.appendChild(card);

  // card event handlers

  // remove card event 
  // document.querySelector('.remove-card')
  removeButton.addEventListener('click', function (event) {

    event.preventDefault()

    // grab the card index or data-name 

    // remove card, array and local item 
    card.remove()
    // when we remove card via indexing - remember to +1 to array index
    let is = card.getAttribute('data-index');
    console.log('is =', is);
    console.log('type:', typeof (is));
    let i = Number(is);
    console.log('i =', i)
    // searchHistory.removeByValue(whichArtist)
    searchHistory.splice(i, 1);
    // new array
    console.log('array was edited: ', searchHistory)
    // how to find the correct array item?
    localStorage.savedArtists = JSON.stringify(JSON.parse(localStorage.savedArtists ?? "[]").slice(0, -1));

  })
}


// OK! mission accomplished!

// next:

// -> we need to create a new object stored for EACH fetch user does

  // must store a new object (name, genre, artwork link) for each artist
  // must appropriately index them?  Or just use data-name which is assigned during card creation

// retrieve all the objects on load (function)

// 


