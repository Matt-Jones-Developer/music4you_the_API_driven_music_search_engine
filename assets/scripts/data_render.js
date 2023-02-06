// an initial build development from initial testing scripts
// will be split into data.js render.js and main.js 

// search elements
const searchBtn = document.querySelector(".search-button")
const userSearch = document.querySelector("#search-input")

// modal access?
const errorModalEl = document.querySelector('#errorModalEl')

// render elements
const gridContainer = document.querySelector("#grid-container")
const artistNameLabel = document.querySelector(".artist-name")
const albumNameLabel = document.querySelector(".album-name")
const albumArtLabel = document.querySelector(".album-art")
const genreLabel = document.querySelector(".genre")
const styleLabel = document.querySelector(".style")
const goButton = document.querySelector(".go-button")

// force global as to access it on refresh
let searchRequest;

// array to store history
let searchHistory = []
console.log("history array is empty:", searchHistory)

// set a card index - may need to be global here?
let index = 0;

// genreList - exclude 'funk' to allow for Funkadelic, 
// 'blues' for The Blues Brothers 
// punk for daft punk
// 'jazz', for jazzy jeff
// metal for metallica (really??) currently yes!! - alt is all caps??
const genreList = [
  'pop', 'rock', 'country', 'reggae', 'house', 'dubstep', 'disco', 'classical',
  'folk', 'ska', 'dance', 'dub', 'trip hop', 'hip hop', 'hiphop', 'rap',
  'instrumental', 'electronica', 'jive', 'grime', 'zeezy'
]

// // on-load handler - grab items and grid cards from local
// // causing issues - see todos
// window.onload = function () {
//   // if local has save history 
//   if (localStorage.getItem("savedArtists")) {
//     // grab it
//     searchHistory = JSON.parse(localStorage.getItem("savedArtists"));
//     console.log('saved locations found:', searchHistory) // ok

//     // fetch data for each card saved to local storage via artistName
//     fetchData(searchRequest)
//     // generate the cards(s) for the saved artists
//     renderCard()
//   }
// }


// unknown name error - type dj scotch for example

// event listener
searchBtn.addEventListener("click", function (event) {
  event.preventDefault()

  // define the request
  searchRequest = userSearch.value
  console.log("user searched for:", searchRequest)


  // if user clicks button without entering an artist
  // if this was put within the fetchData section - you could catch the console error as before!
  if (searchRequest === '' || !isNaN(searchRequest)) {
    // log error
    console.log('user entered garbage, error passed.')
    // call modal from here
    errorModal()
    return;
  }

  // genre not allowed catch
  if (genreList.some(x => searchRequest.includes(x))) {
    // There's at least one
    // log error
    console.log('user entered a genre, error passed.')
    // call modal from here
    genreModal()
    return;
  }

  // check if value is in the array

  if (searchHistory.includes(searchRequest)) {
    console.log('value already in the array')
    // call dupeModal
    dupeModal()
    return;

    // if (!data[1] && data[1].hasOwnProperty("artist")) {
    //   console.log('artist not found or was a typo')
    // }


  } else {

    // push item to array - else it's not so add it 
    // this is fine, however, if user enters garbage - it will add it!
    // we need to make this if else part of the garbage collector...

    searchHistory.push(searchRequest)
    console.log("new search item added to array: ", searchHistory)
    // save to local 
    localStorage.setItem('savedArtists', JSON.stringify(searchHistory));

    // // try catch here to handle site errors
    // try {
    // only call getArtist IF user hasn't entered that artist yet
    // fetch request (to await and then call app functions)
    fetchData(searchRequest).then(data => {
      // console log the data
      // garbage collector HERE instead
      console.log("fetchData call: ", data) // now defined!

      // if data returns error:6 -> call unknownModal?
      // fail - remove!
      // if (data.error) {
      //   unknownModal()
      // }

      // getArtist() or similar
      getArtist(data, searchRequest)

    })
    //   // fail - remove 
    // } catch (error) {
    //   unknownModal()
    // }
  }
})

// try this for discogs discography? or other...
// /database/search?q={query}&{?type,title,release_title,credit,artist,anv,label,genre,style,country,year,format,catno,barcode,track,submitter,contributor} 

// my clear, concise async await promise all fetchdata function!

async function fetchData(searchRequest) {
  // ... fetch logic
  // grab our fetch API URL
  const queryURLCogs = `
    https://api.discogs.com/database/search?q=${searchRequest}&key=${apiKeyCogs}&secret=${secret}`
  // url for lastfm artist.getinfo
  const queryURLLast = `
    https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${searchRequest}&api_key=${apiKeyLast}&format=json`

  // fetch promise all as response
  const responses = await Promise.all([
    fetch(queryURLCogs),
    fetch(queryURLLast)
  ])
  // map each promise to response 
  const data = await Promise.all(responses.map(function (response) {

    // return the response 
    return response.json()
  }))
  // Log the data to the console - still defined!
  console.log("fetchData function const 'data':", data); // logs an object array of both API data OK

  // catch user type error
  // Check if the data exists and is defined
  // type in Graham Cox - returns a 'name' error - needs fixing!!
  if (data[1] && data[1].hasOwnProperty("artist")) {
    return data;

  } else {
    // pop it off the array 
    searchHistory.pop(searchRequest)
    console.log('bad entry popped!', searchHistory)
    // remove it from local - this sets it blank - no!
    // localStorage.setItem('search-history', JSON.stringify(''));
    // from stack overflow (one-liner) https://stackoverflow.com/questions/63351263/how-to-remove-last-value-localstorage
    localStorage.savedArtists = JSON.stringify(JSON.parse(localStorage.savedArtists ?? "[]").slice(0, -1))
    console.log('bad value was removed from array and local:', searchHistory, localStorage)
    unknownModal()
  }
}

// finally, the getArtist(data) function to access all the data nomnomnom

function getArtist(data) {
  console.log("getArtist found data: ", data); // returns correct object, no errors or undefined

  // grabbing from API 1 (results array)

  // are these let or const?? I think we want them to change

  // access bio pic (if none available art below)
  // access cogsData array items
  let cogBioData = data[0].results[0];
  console.log("cogsBioData[0]", cogBioData)

  // access album [1]
  let cogData = data[0].results[1];
  console.log("cogsData array[1]:", cogData)

  // an alt array for missing/poor images
  let cogDataAlt = data[0].results[4];
  console.log("alt cogsData array(5):", cogDataAlt)

  // access the artist name only
  let name = cogData.title;
  console.log("cogsData artist name: ", name) // logs Nirvana!

  // access artwork [0] bio pic
  let artworkBio = cogBioData.cover_image;
  console.log("cogsData artworkBIO: ", artworkBio)

  // if artwork missing (spacer.gif) - catch
  if (artworkBio.includes("/spacer.gif")) {
    artworkBio = data[0].results[1].cover_image;
    // and twice!
    if (artworkBio.includes("/spacer.gif")) {
      artworkBio = data[0].results[2].cover_image;
    }
  }

  // access artwork [1] 1st album
  let artwork = cogData.cover_image;
  console.log("cogsData artwork: ", artwork)

  // alt image [5] alt image (others may be "spacer.gif")
  // let artworkAlt = cogDataAlt.cover_image;
  // console.log("cogsDataAlt artwork: ", artworkAlt) // dj scotchegg cover error fix

  // unreliable genre from discogs 
  // let cogGenre = cogData.genre
  // console.log("cogsGenre:", cogGenre)

  // grabbing from API 2: lastfm artists array data[1].artist.name

  // access entire lastData array
  let lastData = data[1]
  console.log("Access entire lastfm array: ", lastData)
  // access artist array item
  let artistArray = lastData.artist;
  console.log("Access artist array: ", artistArray)

  // catch a bad name entry
  let artistName = '';

  if (!lastData.artist || !lastData.artist.name) {
    searchHistory.pop();
    console.log('bad entry popped!', searchHistory);
    unknownModal();

  } else {
    artistName = lastData.artist.name;
  }
  console.log("Access artist name: ", artistName)


  // these are causing the 'name' undefined issues ... !! 'talib kwali' etc

  // add ALL the other vars we"ll want to display here [TODO]
  // much better genre options here
  let genreTags = artistArray.tags.tag; // all available genres
  console.log(genreTags)

  let genreArray = genreTags[0];
  console.log(genreArray) // name and a link to other grunge artists!! sweet

  // another random API name error catch - not even genre related haha
  // the genre, and the genre playlist URL
  // let genre = '';
  // if (!lastData.artist.tags.tag[0] || !lastData.artist.tags.tag[0].name) {
  //   // searchHistory.pop();
  //   // console.log('bad entry popped!', searchHistory);
  //   // unknownModal();
  //   console.log('artist name abbreviated, error passed')
  // } else {
  //   let genre = genreArray.name;
  //   console.log('genre:',genre)
  // }

  // caused genres to stop showing entirely!!
  // but type 'fresh prince' and it will add the damn thing to the array as its undefined

  // just keeps breaking the API 
  // let genre = '';
  // if (typeof genre == 'undefined' && typeof genre.name == 'undefined') {
  //   console.log('genreArray or genreArray.url is undefined');
  //   errorModal()
  // }
  // genre
  let genre = genreArray.name;
  console.log('genre:', genre)

  // genre playlist
  let genrePlaylist = "";
  // catch bad url for genre
  if (typeof genreArray !== 'undefined' && typeof genreArray.url !== 'undefined') {
    genrePlaylist = genreArray.url;
    console.log(genrePlaylist)
  } else {
    console.log('genreArray or genreArray.url is undefined');
  }

  // temporary feature until full artist page is built (link to artist page URL)
  let artistPage = artistArray.url;
  console.log('artists URL page for lastfm: ', artistPage)

  // correct call from WITHIN the function we want to add the args to!
  renderCard(
    cogData, name, artwork, artworkBio, lastData, artistArray, artistName, genre, genrePlaylist, artistPage)

}
// finally, we need to access these variables again within renderCard

// dynamic HTML rendering 
// function renderCard(data, cogData, lastData) {
// function renderCard(data, cogData, lastData, name, artwork, artistArray, artistName) {
// data only? NO! we are done with data at this point; we have the new vars to use!

function renderCard(

  cogData, name, artwork, artworkBio, lastData, artistArray, artistName, genre, genrePlaylist, artistPage) {

  // success!! Learning at last!
  console.log(cogData, lastData, name, artwork, artistArray, artistName)

  // for each new artist - create a new card container
  const cardContainer = document.createElement("div")
  // set its class (card-cont?)
  cardContainer.classList.add("d-inline-flex");
  // add a fixed width and centered margin
  cardContainer.style = "width: 100%", "margin: 0 auto";

  // when we remove card via indexing - remember to +1 to array index

  // create the card element
  const card = document.createElement("div");
  card.classList.add("card", "bg-dark", "m-3", "justify-content-center");
  // also add the cols
  card.classList.add("col-lg-3", "col-md-6", "col-sm-12");

  // set card attr and styling 
  card.setAttribute("data-name", artistName);
  // console.log(card.getAttribute('data-name'))
  // card.setAttribute("data-index", ++index);
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
  artistEl.textContent = `${artistName}`;
  // style here
  artistEl.style.fontSize = "34px";
  artistEl.style.letterSpacing = ".2rem";

  // add a genre label
  const genreEl = document.createElement("h3");
  genreEl.textContent = `${genre}`;
  // styling
  genreEl.style.fontSize = "18px";

  // cogGenre element (to append to genreEl)
  // const cogGenreEl = document.createElement("h3");
  // cogGenreEl.textContent = `${cogGenre}`;
  // // style here
  // cogGenreEl.style.fontSize = "18px";

  // style (sub genre)
  // const styleEl = document.createElement("h3")
  // styleEl.textContent = `${style}`
  // // style here
  // styleEl.style.fontSize = "18px"
  // // clear prior values
  // styleEl.innerHTML = ""
  // // // append
  // styleLabel.appendChild(styleEl)

  // add an image
  const albumArtEl = document.createElement("img");
  // specify src
  albumArtEl.src = `${artworkBio}`;
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
  const artistButtonLink = document.createElement("a");
  artistButtonLink.href = `${artistPage}`;
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

  // merging cogs genre with lastfm genre
  // let genreMixEl = genre + "/" + cogGenre;
  // genreLabel.append(genreEl, cogGenreEl);

  // final card appends
  card.append(artistEl, genreEl); // genreEl for just lastFM or genreMixEl for both
  cardBody.appendChild(albumArtEl);
  cardBody.append(artistButton, removeButton)
  card.appendChild(cardBody);
  gridContainer.appendChild(card);

  // card event handlers

  // redirect to URL link (temp artist page)
  artistButton.addEventListener('click', function (event) {

    event.preventDefault()
    // Redirect to the artistButtonLink's href
    window.location.href = artistButtonLink.getAttribute("href");

  })

  // remove button (delete card) handler
  // finally we have a winner!!! filter and toLowerCase since some/most were being sent as mixed case!!

  removeButton.addEventListener('click', function (event) {
    event.preventDefault();

    // grab the card index
    let indexName = card.getAttribute('data-name');
    console.log('cardIndex =', indexName);

    // remove the item from the searchHistory array using filter
    searchHistory = searchHistory.filter(function (historyItem) {
      return historyItem.toLowerCase() !== indexName.toLowerCase();
    });
    console.log('searchHistory after filter: ', searchHistory);

    // remove the item from local storage using filter
    let savedArtists = JSON.parse(localStorage.getItem("savedArtists") || "[]");
    savedArtists = savedArtists.filter(function (historyItem) {
      return historyItem.toLowerCase() !== indexName.toLowerCase();
    });
    localStorage.setItem("savedArtists", JSON.stringify(savedArtists));

    // remove the card
    card.remove();
  });

}

// error modal handling

// error modal function
function errorModal() {
  console.log('modal called')
  showModal()
  // stope more being added! (remove them if exist?)
  const previousModal = document.querySelector(".modal-dialog");
  if (previousModal) {
    previousModal.remove();
  }
  // attached to event listener
  // if user presses whilst value is empty: open modal
  // somehow attach the modal to the button
  // create the modal div 
  const errorModalDiv = document.createElement("div");
  errorModalDiv.classList.add("modal-dialog", "modal-dialog-centered")
  errorModalDiv.innerHTML = '';
  errorModalDiv.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
        <h4 class="modalTitle">Polite Notice</h4>
        </div>
        <div class="modal-body justify-content-center">
          <!-- app helper -->
          <div class="row g-3 align-items-center app-help">
            <div class="col-auto">
              <span id="appHelpInline" class="form-text">
                You need to search for an artist before you hit the search button.
                <br>
                Try again!
              </span>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" id="close-modal" data-bs-dismiss="modal">Close</button>
        </div>
      </div>`
  // append the modal to the DOM
  errorModalEl.appendChild(errorModalDiv);

  // if close button clicked - hide or close modal? In the same event??

  // if close X clicked - close the modal
  const closeButton = document.querySelector('#close-modal');

  closeButton.addEventListener('click', function () {
    hideModal()
  });
}

// modal for a duplicate artist search
// TODO
// add if search.length > 15 chars - reduce font size!

function dupeModal() {
  console.log('modal called')
  showModal()
  // stope more being added! (remove them if exist?)
  const previousModal = document.querySelector(".modal-dialog");
  if (previousModal) {
    previousModal.remove();
  }
  // attached to event listener
  // if user presses whilst value is empty: open modal
  // somehow attach the modal to the button
  // create the modal div 
  const dupeModalDiv = document.createElement("div");
  dupeModalDiv.classList.add("modal-dialog", "modal-dialog-centered")
  dupeModalDiv.innerHTML = '';
  dupeModalDiv.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
        <h4 class="modalTitle">Polite Notice</h4>
        </div>
        <div class="modal-body justify-content-center">
          <!-- app helper -->
          <div class="row g-3 align-items-center app-help">
            <div class="col-auto">
              <span id="appHelpInline" class="form-text">
                You've already searched and added this artist to your library!
                <br>
                Please pick another artist.
              </span>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" id="close-modal" data-bs-dismiss="modal">Close</button>
        </div>
      </div>`
  // append the modal to the DOM
  errorModalEl.appendChild(dupeModalDiv);

  // if close button clicked - hide or close modal? In the same event??

  // if close X clicked - close the modal
  const closeButton = document.querySelector('#close-modal');

  closeButton.addEventListener('click', function () {
    hideModal()
  });
}

// unknown/mis-spelt function
function unknownModal() {
  console.log('modal called')
  showModal()
  // stope more being added! (remove them if exist?)
  const previousModal = document.querySelector(".modal-dialog");
  if (previousModal) {
    previousModal.remove();
  }
  // attached to event listener
  // if user presses whilst value is empty: open modal
  // somehow attach the modal to the button
  // create the modal div 
  const unknownModalDiv = document.createElement("div");
  unknownModalDiv.classList.add("modal-dialog", "modal-dialog-centered")
  unknownModalDiv.innerHTML = '';
  unknownModalDiv.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
        <h4 class="modalTitle">Polite Notice</h4>
        </div>
        <div class="modal-body justify-content-center">
          <!-- app helper -->
          <div class="row g-3 align-items-center app-help">
            <div class="col-auto">
              <span id="appHelpInline" class="form-text">
                Artist not recognised. <br>  Please make sure you have spelt the name correctly!
                <br>
                Until our system improves by catching typos(!), please try again.
              </span>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" id="close-modal" data-bs-dismiss="modal">Close</button>
        </div>
      </div>`
  // append the modal to the DOM
  errorModalEl.appendChild(unknownModalDiv);

  // if close button clicked - hide or close modal? In the same event??

  // if close X clicked - close the modal
  const closeButton = document.querySelector('#close-modal');

  closeButton.addEventListener('click', function () {
    hideModal()
  });
}

// unknown/mis-spelt function
function genreModal() {
  console.log('genre modal called')
  showModal()
  // stope more being added! (remove them if exist?)
  const previousModal = document.querySelector(".modal-dialog");
  if (previousModal) {
    previousModal.remove();
  }
  // attached to event listener
  // if user presses whilst value is empty: open modal
  // somehow attach the modal to the button
  // create the modal div 
  const unknownModalDiv = document.createElement("div");
  unknownModalDiv.classList.add("modal-dialog", "modal-dialog-centered")
  unknownModalDiv.innerHTML = '';
  unknownModalDiv.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
        <h4 class="modalTitle">Polite Notice</h4>
        </div>
        <div class="modal-body justify-content-center">
          <!-- app helper -->
          <div class="row g-3 align-items-center app-help">
            <div class="col-auto">
              <span id="appHelpInline" class="form-text">
                You cannot search via Genre here.
                <br>
                If you go to an artist's page, you can search for similar genres and even entire genre playlists!
              </span>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" id="close-modal" data-bs-dismiss="modal">Close</button>
        </div>
      </div>`
  // append the modal to the DOM
  errorModalEl.appendChild(unknownModalDiv);

  // if close button clicked - hide or close modal? In the same event??

  // if close X clicked - close the modal
  const closeButton = document.querySelector('#close-modal');

  closeButton.addEventListener('click', function () {
    hideModal()
  });
}

// show and hide the modal
function showModal() {
  errorModalEl.classList.add('show');
  errorModalEl.style.display = 'block';
}

function hideModal() {
  errorModalEl.classList.remove('show');
  errorModalEl.style.display = 'none';
}

// on-load render saved cards

// on-load handler - grab items and grid cards from local
window.onload = function () {
  // if local has save history 
  if (localStorage.getItem("savedArtists")) {
    // grab it
    searchHistory = JSON.parse(localStorage.getItem("savedArtists"));
    console.log('saved locations found:', searchHistory) // ok

    // loop through each saved artist in searchHistory
    searchHistory.forEach(artist => {
      // set artistName to current artist
      artistName = artist;
      // fetch data for each saved artist
      fetchData(searchHistory)
      // generate the card(s) for the saved artist
      renderCard()
    });
  }
}
