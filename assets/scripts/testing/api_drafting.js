

// API fetch drafting - CONSOLE ONLY !! open your console to see the API fetching

// getting grips with the API fetch

// last.fm vs discogs

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

// const artistNameLabel = document.querySelector('.artist-name')
// const albumNameLabel = document.querySelector('.album-name')
// const albumArtLabel = document.querySelector('.album-art')
// const genreLabel = document.querySelector('.genre')

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
    // artist info 
    // grab name 
    let artistName = data.artist.name
    console.log('artist name: ', artistName)
    // console.log(data.artist.bio.content) // huge bio and text blurb!
    console.log('bio link: ', data.artist.bio.links.link.href) // link to lastFM bio
    // best link https://www.last.fm/music/Eminem (has tracks, intro, trending)
    console.log('bio summary with homepage link (to tracks etc): ', data.artist.bio.summary) // nice summary text PLUS correct href link to the artist page!

    // define artist.bio
    let artistLink = data.artist.bio.summary;
    console.log('artist page: URL: ', artistLink)

    // artist images 
    let artistImages = data.artist.image[3] // needs a constructor class?
    // access image section
    let artistimg = data.artist.image

    class getImage {
      #text;// declare private variable called #text

      constructor() {
        this.#text = "image";//define private variable called "image"
      }
    }
    console.log(artistimg.getImage) // undefined 

    // is touring?
    // we add a conditonal when this is searched: if === 0: log 'not currently touring' else: 'touring
    console.log('on tour? returns a boolean switch (0/1): ', data.artist.ontour)
    // similar artists array
    let similarArtistsArray = data.artist.similar.artist;
    console.log('similar artists: ', similarArtistsArray)
    // similar artists 
    let similarArtists = data.artist.similar.artist[1];
    console.log('similar artist (pick an array value): ', similarArtists)
    // similar artist URL
    console.log('similar artist pick URL link:', similarArtists.url)


    // we could use discogs here for images??

    // call our functions
    // getArtist() or similar
    // getArtist(data)

    // render the data to page
    // renderContent(data)
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
  https://api.discogs.com/database/search?q=${searchRequest}/releases&key=${apiKeyCogs}&secret=${secret}`


  // musixMatch URL
  // const queryURLMusix = `
  // https://api.musixmatch.com/ws/1.1/artist.get?artist_mbid=65f4f0c5-ef9e-490c-aee3-909e7ae6b2ab&api=${apiKeyMusix}`

  // await fetch
  const response = await fetch(queryURLLast) // must I create a separate fetch for discogs?  I presume so!
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

// function getArtist (data) {
//   console.log(data)

//   // console.log('releases:?',data.releases) //undefined (I cannot see releases in the data?)

//   // define full array
//   const artistArray = data.results[0]
//   console.log(artistArray)

//   // define an element of data
//   const artistUnknown = artistArray.artist
//   console.log(artistUnknown) // undefined

//   // grab artist name ONLY [0]
//   const artist = data.results[1].title
//   console.log(artist)

//   // define artist and album title
//   const title = artistArray.title
//   console.log(title) // fetches the artist album name

//   // define cover image
//   const artwork = artistArray.cover_image
//   console.log(artwork)

//   return data
// }

// function renderContent (data, artistArray, artist, title, artwork) {
//   // testing grab variables from inside another function
//   console.log(data) // this passes
//   console.log(artistArray) // but these are all undefined?? Why?
//   console.log(artist)
//   console.log(title)
//   console.log(artwork)

//   // rebuild the data here (until fix)
//   const artistName = data.results[4].title // artist name ONLY
//   console.log(artistName)

//   const albumName = data.results[4].title // artist album name
//   console.log(albumName)

//   const albumArtwork = data.results[4].cover_image
//   console.log(albumArtwork)

//   const artistDatabase = data.results[4]

//   const genre = artistDatabase.genre
//   console.log('genre:', genre)

//   // h1 title
//   const artistEl = document.createElement('h1')
//   artistEl.textContent = `${artistName}` // should really be the arg 'artist'
//   // style here
//   artistEl.style.fontSize = '38px'
//   // clear prior values
//   artistNameLabel.innerHTML = ''
//   // append
//   artistNameLabel.appendChild(artistEl)

//   // album title
//   const albumNameEl = document.createElement('h2')
//   albumNameEl.textContent = `${albumName}`
//   // style here
//   albumNameEl.style.fontSize = '30px'
//   // clear prior values
//   albumNameLabel.innerHTML = ''
//   // append
//   albumNameLabel.appendChild(albumNameEl)

//   // genre
//   const genreEl = document.createElement('h3')
//   genreEl.textContent = `${genre}`
//   // style here
//   genreEl.style.fontSize = '22px'
//   // clear prior values
//   genreLabel.innerHTML = ''
//   // append
//   genreLabel.appendChild(genreEl)

//   // image
//   const albumArtEl = document.createElement('img')
//   albumArtEl.src = `${albumArtwork}`
//   albumArtEl.classList.add('album-img')
//   // clear prior values
//   albumArtLabel.innerHTML = ''
//   // append
//   albumArtLabel.appendChild(albumArtEl)
//   // description/other
// }

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