// accessing variables within local scope functions 

// funcOne()

// function funcOne() {
//   let a = 3
//   let b = 5
//   console.log(a,b)
//   return a,b;
// }

// funcTwo()

// function funcTwo(a,b) {

//   let c = a + b;
//   console.log(c) // NaN
//   return c;
// }

// we are not calling funcTwo correctly! 
// must be called WITHIN the function we want to take the inputs from!

funcOne()

function funcOne() {
  let a = 3
  let b = 5
  console.log(a, b)
  funcTwo(a, b)
  // return a,b; // no need to return it now
}

// funcTwo() // this should be INSIDE funcOne!

function funcTwo(a, b) {

  let c = a + b;
  console.log(c) // NaN
  return c;
}

// same with objects

funcThree()
function funcThree() {
  const data = [
    { dataOne: 5 },
    { dataTwo: 7 }
  ]
  console.log(data) // logs the object data successfully
  funcFour(data)
}

function funcFour(data) {
  let dataObject = data;
  console.log(data) // logs the object data successfully
  return data;
}

// lets try with requests

// lastFM keys
const apiKeyLast = 'a87d07d178f9511fa2e22a54dbe7f678'

// discogs key and secret
const apiKeyCogs = 'SUabynzSHsiRIoQDRiOv'
const secret = 'YVLXccThJwokGpRwpgaQzkvUJKSlkhun'

const searchRequest = 'Nirvana';

// call the fetch function
fetchData(searchRequest).then(data => {

  // call other functions that access data here too
  getArtist(data)

})

// // fetchData function
// function fetchData(searchRequest) {

//   // grab our fetch API URL
//   const queryURLCogs = `
//   https://api.discogs.com/database/search?q=${searchRequest}&key=${apiKeyCogs}&secret=${secret}`
//   // url for lastfm artist.getinfo
//   const queryURLLast = `
//   https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${searchRequest}&api_key=${apiKeyLast}&format=json`

//   // fetch promise all
//   Promise.all([
//     fetch(queryURLCogs),
//     fetch(queryURLLast)
//   ]).then(function (responses) {
//     // Get a JSON object from each of the responses
//     return Promise.all(responses.map(function (response) {
//       return response.json();
//     }));
//   }).then(function (data) {
//     // Log the data to the console
//     console.log(data); // returns an object array of both API data
// });

// }

// // function that uses fetched data
// function getArtist(data) {

//   // check its accessed
//   console.log(data)
//   return data;
// }

// cannot read undefined error - fetchData needs to return the Promise returned by the call to Promise.all.

// function fetchData(searchRequest) {
//   // ...
//   // fetch promise all
//   return Promise.all([
//     fetch(queryURLCogs),
//     fetch(queryURLLast)
//   ]).then(function (responses) {
//     // ...
//   });
// }

// so this would work: adding return 

// // fetchData function
// function fetchData(searchRequest) {

//   // grab our fetch API URL
//   const queryURLCogs = `
//   https://api.discogs.com/database/search?q=${searchRequest}&key=${apiKeyCogs}&secret=${secret}`
//   // url for lastfm artist.getinfo
//   const queryURLLast = `
//   https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${searchRequest}&api_key=${apiKeyLast}&format=json`

//   // fetch promise all
//   return Promise.all([
//     fetch(queryURLCogs),
//     fetch(queryURLLast)
//   ]).then(function (responses) {
//     // Get a JSON object from each of the responses
//     return Promise.all(responses.map(function (response) {
//       return response.json();
//     }));
//   }).then(function (data) {
//     // Log the data to the console
//     console.log(data); // logs an object array of both API data
// });

// }

// // function that uses fetched data - still undefined here!
// function getArtist(data) {

//   // check its accessed
//   console.log(data) // undefined
//   return data; // 
// }


// async converted?

// // fetchData function
// async function fetchData(searchRequest) {

//   // grab our fetch API URL
//   const queryURLCogs = `
//   https://api.discogs.com/database/search?q=${searchRequest}&key=${apiKeyCogs}&secret=${secret}`
//   // url for lastfm artist.getinfo
//   const queryURLLast = `
//   https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${searchRequest}&api_key=${apiKeyLast}&format=json`

//   // fetch promise all
//   const responses = await Promise.all([
//     fetch(queryURLCogs),
//     fetch(queryURLLast)
//   ])
//   const data = await Promise.all(responses.map(function (response) {

//     return response.json()
//   }))
//   // Log the data to the console
//   console.log(data); // logs an object array of both API data OK
//   // actually call getArtist with data as an arg
//   getArtist(data); // this WILL now access data - 

//   // BUUUUT!!! will also still log 'UNDEFINED' in the same log below?

//   // why??

//   // BECAUSE !!
//   // getArtist function does not have a return statement that returns data.

//   // Without a return statement, the function will implicitly return undefined.

// }

// // function that uses fetched data - BUT STILL undefined here! Why?

// // The getArtist function is not accessing the data object because 
// // it is not being passed as an argument. (above!)

// // like my previous working examples above - you MUST call the getArtist(data) within fetchData function!

// function getArtist(data) {

//   // check its accessed
//   console.log(data) // undefined
//   return data; // 
// }

// so whats going on? 
// we need to make sure fetchData has resolved d returned a value BEFORE
// calling this function!

// so something like:  Now, everything returns and works!!

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
  // Log the data to the console
  console.log(data); // logs an object array of both API data OK
  return data;
}

// // a separate calling - we already have this above!!
// fetchData(searchRequest)
//   .then(data => {
//     getArtist(data);
//   });

// Now working perfectly!

// function getArtist(data) {
//   console.log(data); // returns correct object, no errors or undefined
//   return data;
// }

// so, in the console we can grab that object as a temp global 
// access items thusly:

// temp1[0].results[0].title (logs 'Nirvana')

// how do we now create new vars/objects and access the nested data?


function getArtist(data) {
  console.log(data); // returns correct object, no errors or undefined

  // grabbing from API 1 (results array)
  
  // access (like temp1 does above)?
  let results = data[0].results[0]; // it works!!
  console.log(results)

  // access the artist name only
  let name = results.title;
  console.log(name) // logs Nirvana!


  // grabbing from API 2: artists array

  let artists = data[1]
  console.log(artists) // access entire array

  let artistArray = artists.artist;
  console.log(artistArray)

  let artistName = artistArray.name;
  console.log(artistName)

  return data;
}
