// API fetch drafting

// getting grips with the API fetch

// last.fm vs discogs

// DISCOGS IS FOR ALBUM ART, and Genres/Styles ONLY !! (even some have 0 genre info??)

// lastFM is our main API - titles, genres, URL links to player page etc 

// search elemnts

const searchBtn = document.querySelector('.search-button')
// const albumSearchBtn = document.querySelector('.album-search-button')
const userSearch = document.querySelector('#search-input')

// lastFM keys
const apiKeyLast = 'a87d07d178f9511fa2e22a54dbe7f678'

// discogs key and secret
const apiKeyCogs = 'SUabynzSHsiRIoQDRiOv'
const secret = 'YVLXccThJwokGpRwpgaQzkvUJKSlkhun'

// musixmatch api

const apiKeyMusix = '418ba039b53e2d2e88ebda069a30a55e'

// wikiMedia keys
// Client ID:
// 40736fd6fadb2d9f4563d29b105788eb
// Client secret:
// 9753939a04553de256b898ae5bf07485e01acd94

const apiIDWiki = '40736fd6fadb2d9f4563d29b105788eb'
const secretWiki = '9753939a04553de256b898ae5bf07485e01acd94'

// render elements
const cardContainer = document.querySelector('.card-container')
const artistNameLabel = document.querySelector('.artist-name')
const albumNameLabel = document.querySelector('.album-name')
const albumArtLabel = document.querySelector('.album-art')
const genreLabel = document.querySelector('.genre')
const styleLabel = document.querySelector('.style')
const goButton = document.querySelector('.go-button')

// why do we need to add an album here? (because last.fm is crap)
// let album = 'nevermind'

// start_app function

// array to store history
const searchHistory = []
console.log('history array is empty:', searchHistory)

// event listener

searchBtn.addEventListener('click', function (event) {
  event.preventDefault()

  const searchRequest = userSearch.value
  console.log('user searched for:', searchRequest)

  // const albumSearchRequest = albumSearchBtn
  // console.log('user searched for:', searchRequest)

  // push to the array
  searchHistory.push(searchRequest)
  console.log('new search item added to array', searchHistory)

  // fetch request (to await and then call app functions)

  fetchData(searchRequest).then(data => {
    // console log the data
    console.log(data)
    // what data can we fetch? (dot testing)


    // we could use discogs here for images??

    // call our functions
    // getArtist() or similar
    getArtist(data)

    // render the data to page
    renderContent(data)
  })
})

// fetchData function
async function fetchData(searchRequest) {
  // set the URL  (this can be changed back to ${searchRequest}) - currently we are adding search to the array
  // original artist/album search url
  // fetch("http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=a87d07d178f9511fa2e22a54dbe7f678&artist=Cher&album=Believe&format=json")
  //   .then(response => response.json())
  //   .then(data => console.log(data))
  // const queryURL = `
  // https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=a87d07d178f9511fa2e22a54dbe7f678&artist=${searchRequest}&album=${albumSearchRequest}&format=json`
  // last.fm query - requires 2 parameters??
  // artist ONLY /2.0/?method=artist.search&artist=cher&api_key=YOUR_API_KEY&format=json
  // const queryURL = `
  // https://ws.audioscrobbler.com/2.0/?method=artist.search&api_key=a87d07d178f9511fa2e22a54dbe7f678&artist=${searchRequest}&format=json`
  // artist.info search nope! 404
  const queryURLLast = `
  https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${searchRequest}&api_key=${apiKeyLast}&format=json`

  // does not search for albums now, only eminem and all featuring artists lists??

  // vs discog
  // let queryURL = `
  // https://api.discogs.com/database/search?q=${searchRequest}&origin=*&key=SUabynzSHsiRIoQDRiOv&secret=YVLXccThJwokGpRwpgaQzkvUJKSlkhun`

  // const queryURL = `
  //   https://api.discogs.com/artists/${searchRequest}/releases&origin=*&key=SUabynzSHsiRIoQDRiOv&secret=YVLXccThJwokGpRwpgaQzkvUJKSlkhun`

  // updated URL
  const queryURLCogs = `
  https://api.discogs.com/database/search?q=${searchRequest}&key=${apiKeyCogs}&secret=${secret}`


  // musixMatch URL
  // const queryURLMusix = `
  // https://api.musixmatch.com/ws/1.1/artist.get?artist_mbid=65f4f0c5-ef9e-490c-aee3-909e7ae6b2ab&api=${apiKeyMusix}`

  // await fetch
  const response = await fetch(queryURLCogs) // must I create a separate fetch for discogs?  I presume so!
  // await and assign data
  const data = await response.json()

  // debug
  console.log(data)
  // return data
  return data

  // fetch(queryURL)
  // .then(response => {
  //     if (response.ok) {
  //         return response.json();
  //     }
  //     throw new Error("Network response was not ok.");
  // })
  // .then(data => {
  //     const releases = data.releases;
  //     releases.forEach(release => {
  //         console.log(release.title);
  //     });
  // })
  // .catch(error => {
  //     console.error(error);
  // });
}

// grab the artist data and display it

// via lastFM - we can now seem to access:
// artist.bio.content (bio)
// artist.image[0] - thumbnail up to [5], [4] is 'mega' size
// artist.bio.links.link - goes to the lastFM page bio on Eminem
// artist.bio.links.link after bio can click 'tracks' and play tracks via this method (goes to https://www.last.fm/music/Eminem/+tracks)

function getArtist(data) {
  console.log(data)

  // console.log('releases:?',data.releases) //undefined (I cannot see releases in the data?)

  // define full array
  const artistArray = data.results[0]
  console.log(artistArray)

  // define an element of data
  const artistUnknown = artistArray.artist
  console.log(artistUnknown) // undefined

  // grab artist name ONLY [0]
  const artist = data.results[1].title
  console.log(artist)

  // define artist and album title
  const title = artistArray.title
  console.log(title) // fetches the artist album name

  // define cover image
  const artwork = artistArray.cover_image
  console.log(artwork)

  return data
}

function renderContent(data, artistArray, artist, title, artwork) {
  // testing grab variables from inside another function
  console.log(data) // this passes
  console.log(artistArray) // but these are all undefined?? Why?
  console.log(artist)
  console.log(title)
  console.log(artwork)

  // rebuild the data here (until fix)
  const artistName = data.results[0].title // artist name ONLY
  console.log(artistName)

  // const albumName = data.results[1].title // artist album name
  // console.log(albumName)

  const albumArtwork = data.results[1].cover_image // 0 = bio pics 1 = main album?
  console.log(albumArtwork)

  let randomResults = data.results;
  console.log('random results array:', randomResults)

  // generate a random image?
  let randomImage = randomResults[Math.floor(Math.random() * randomResults.length)].cover_image;

  for (let i = 0; i < randomResults.cover_image; i++) {
    console.log(randomImage[i])

  }


  const artistDatabase = data.results[1]

  const genre = artistDatabase.genre
  console.log('genre:', genre)

  const style = artistDatabase.style
  console.log('style:', style)

  // for each new artist - create a new card
  // clear previous
  cardContainer.innerHTML = '';
  // create the card element
  const card = document.createElement("div");
  card.classList.add("card", "bg-dark", "m-3", "justify-content-center");

  // set card attr and styling 
  card.setAttribute('data-index', artistName);
  card.style.padding = '1rem';

  // create card body
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  // add title
  const artistEl = document.createElement("h1");
  artistEl.classList.add("card-title");
  artistEl.textContent = `${artistName}` // should really be the arg 'artist'
  // style here
  artistEl.style.fontSize = '34px'
  // clear prior values
  artistNameLabel.innerHTML = ''


  // // h1 title
  // const artistEl = document.createElement('h1')
  // artistEl.textContent = `${artistName}` // should really be the arg 'artist'
  // // style here
  // artistEl.style.fontSize = '34px'
  // // clear prior values
  // artistNameLabel.innerHTML = ''
  // // append
  // artistNameLabel.appendChild(artistEl)

  // // album title
  // const albumNameEl = document.createElement('h2')
  // albumNameEl.textContent = `${albumName}`
  // // style here
  // albumNameEl.style.fontSize = '30px'
  // // clear prior values
  // albumNameLabel.innerHTML = ''
  // // append
  // albumNameLabel.appendChild(albumNameEl)

  // genre
  const genreEl = document.createElement('h3')
  genreEl.textContent = `${genre}`
  // style here
  genreEl.style.fontSize = '18px'
  // clear prior values
  genreLabel.innerHTML = ''
  // // append
  genreLabel.appendChild(genreEl)

  // style (sub genre)
  const styleEl = document.createElement('h3')
  styleEl.textContent = `${style}`
  // style here
  styleEl.style.fontSize = '18px'
  // clear prior values
  styleEl.innerHTML = ''
  // // append
  styleLabel.appendChild(styleEl)

  // image
  const albumArtEl = document.createElement('img')
  albumArtEl.src = `${albumArtwork}`
  // albumArtEl.src = `${randomImage}`
  albumArtEl.classList.add('album-img')
  albumArtEl.style.width = '300px';
  albumArtEl.style.height = '300px';
  // clear prior values
  albumArtLabel.innerHTML = ''
  // append
  albumArtLabel.appendChild(albumArtEl)
  // description/other

  // go to page button
  const artistButton = document.createElement('button');
  artistButton.classList.add('btn');
  artistButton.style.height = '2.3rem';
  artistButton.style.color = '#fff';
  artistButton.textContent = 'Get more';
  // artistButton.style.background = 'rgb(85, 12, 193)'; 
  // artistButton.innerHTML = '';

  // append button to label
  goButton.appendChild(artistButton)

  // add genre and style labels together 
  const styleGenreEl = genre + '/' + style;
  genreLabel.append(genreEl, styleEl)

  // appending
  card.append(artistEl, genreEl);
  cardBody.append(albumArtEl, artistButton)
  card.appendChild(cardBody)
  cardContainer.appendChild(card)
}

// attempting to access the #text from last.fm 

// getArtistInfo: function(artist, success, error) {
//   this.get('artist.getinfo', { artist: artist }, function (response) {
//     var image = response.artist.image[4]["#text"];
//     if (image) {
//       success(image);
//       const mbid = response.artist.mbid;
//       console.table(response);
//       if (mbid) {
//         const url = 'https://musicbrainz.org/ws/2/artist/' + mbid + '?inc=url-rels&fmt=json';
//         console.log(url);
//         fetch(url)
//           .then(res => res.json())
//           .then((out) => {
//             const relations = out.relations;
//             console.table(relations);
//             // Find image relation
//             for (let i = 0; i < relations.length; i++) {
//               if (relations[i].type === 'image') {
//                 let image_url = relations[i].url.resource;
//                 if (image_url.startsWith('https://commons.wikimedia.org/wiki/File:')) {
//                   const filename = image_url.substring(image_url.lastIndexOf('/') + 1);
//                   image_url = 'https://commons.wikimedia.org/wiki/Special:Redirect/file/' + filename;
//                 }
//                 console.log(image_url);
//                 success(image_url);
//               }
//             }
//           })
//           .catch(err => { throw console.log(err) });
//       }
//     }, error);
// },