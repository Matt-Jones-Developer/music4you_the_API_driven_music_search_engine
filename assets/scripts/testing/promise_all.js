// a neat way of fetching rom multiple APIs using fetch all

// search elemnts

const searchBtn = document.querySelector('.search-button')
const userSearch = document.querySelector('#search-input')

searchBtn.addEventListener('click', function (event) {
  event.preventDefault()

  const searchRequest = userSearch.value
  console.log('user searched for:', searchRequest)


  fetchData(searchRequest).then(data => {
    // console log the data
    console.log(data) // undefined

  })
})

const queryURLCogs = `
https://api.discogs.com/database/search?q=eminem&key=${apiKeyCogs}&secret=${secret}`

const queryURLLast = `
https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=eminem&api_key=${apiKeyLast}&format=json`


async function fetchData(searchRequest) {

  const queryURLCogs = `
https://api.discogs.com/database/search?q=${searchRequest}&key=${apiKeyCogs}&secret=${secret}`

  const queryURLLast = `
https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${searchRequest}&api_key=${apiKeyLast}&format=json`

  // fetch
  // must I create a separate fetch for discogs?  I presume... NO!

  // promise all testing 

  Promise.all([
    fetch(queryURLCogs),
    fetch(queryURLLast)
  ]).then(function (responses) {
    // Get a JSON object from each of the responses
    return Promise.all(responses.map(function (response) {
      return response.json();
    }));
  }).then(function (data) {
    // Log the data to the console
    console.log(data);
    // return data
    return data
  }).catch(function (error) {
    // if there's an error, log it
    console.log('error fetching:', error);
  });

}


// the way we set this up and try to access data from it is not right;
// it can be simplier (from the working out I got from 'returning_accessing.js')

// here is the mess I got myself into (for reference!!)

// fetch from API's
async function fetchData(searchRequest) {
  // url for discog images
  const queryURLCogs = `
  https://api.discogs.com/database/search?q=${searchRequest}&key=${apiKeyCogs}&secret=${secret}`
  // url for lastfm artist.getinfo
  const queryURLLast = `
  https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${searchRequest}&api_key=${apiKeyLast}&format=json`

  // may wish to explore/compare 'method=album.getinfo and others (see documentation!)
  const queryURLLastAlbum = `
  http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=a87d07d178f9511fa2e22a54dbe7f678&artist=Cher&album=Believe&format=json`

  // promise all
  // Promise.all([
  //   fetch(queryURLCogs),
  //   fetch(queryURLLast)
  // ]).then(function (responses) {
  //   // Get a JSON object from each of the responses
  //   return Promise.all(responses.map(function (response) {
  //     return response.json();
  //   }));
  // }).then(function (data) {
  //   // Log the data to the console
  //   console.log(data); // returns an object array of both api datas 
  //   // define the data object so its accessible
  //   const dataObject = data;
  //   const firstItem = data[0];
  //   console.log(firstItem);
  //   // return data
  //   return data;
  // }).catch(function (error) {
  //   // if there's an error, log it
  //   console.log('error fetching:', error);
  // });

  // promise all with dataObject var
  // let dataObject;

  // Promise.all([
  //   fetch(queryURLCogs),
  //   fetch(queryURLLast)
  // ]).then(function (responses) {
  //   // Get a JSON object from each of the responses
  //   return Promise.all(responses.map(function (response) {
  //     return response.json();
  //   }));
  // }).then(function (data) {
  //   // Log the data to the console
  //   console.log(data); // returns an object array of both api datas 
  //   // define the data object so its accessible
  //   dataObject = data;
  //   const cogsData = data[0];
  //   console.log(cogsData);
  //   const lastData = data[1];
  //   console.log(lastData);
  //   // return data
  //   return dataObject, cogsData, lastData;

  // }).catch(function (error) {
  //   // if there's an error, log it
  //   console.log('error fetching:', error);
  // });

  Promise.all([
    fetch(queryURLCogs),
    fetch(queryURLLast)
  ]).then(function (responses) {
    // Get a JSON object from each of the responses
    return Promise.all(responses.map(function (response) {
      return response.json();
    }));
  }).then(function (data) {
    // Log the data to the console
    console.log(data); // returns an object array of both API data

    // Define the data object so it's accessible
    const dataObject = data;
    const cogsData = data[0];
    console.log(cogsData);
    const lastData = data[1];
    console.log(lastData);

    // Return the data
    return { dataObject, cogsData, lastData };
    // Access the returned data here
  }).then(function (returnedData) {
    getArtist(returnedData.dataObject, returnedData, returnedData.cogsData, returnedData.lastData);

  }).catch(function (error) {
    // If there's an error, log it
    console.log('error fetching:', error);
  });


}

// making the promise is resolved and data object assigned as an accessible variable
// Promise.all([fetch(API1), fetch(API2)])
//   .then(responses => {
//     return Promise.all(responses.map(response => response.json()));
//   })
//   .then(data => {
//     const dataObject = data;
//     const firstItem = data[0];
//     console.log(firstItem);
//   })
//   .catch(error => {
//     console.error(error);
//   });

// accessing via other functions 

// Promise.all([
//   fetch(queryURLCogs),
//   fetch(queryURLLast)
// ]).then(function (responses) {
//   // Get a JSON object from each of the responses
//   return Promise.all(responses.map(function (response) {
//     return response.json();
//   }));
// }).then(function (data) {
//   // Log the data to the console
//   console.log(data); // returns an object array of both API data

//   // Define the data object so it's accessible
//   const dataObject = data;
//   const firstItem = data[0];
//   console.log(firstItem);

//   // Return the data
//   return {dataObject, firstItem};
// }).then(function (returnedData) {
//   // Access the returned data here
//   console.log(returnedData.dataObject);
//   console.log(returnedData.firstItem);
// }).catch(function (error) {
//   // If there's an error, log it
//   console.log('error fetching:', error);
// });


// What the heck is all this?! haha getting myself into a right mess!!

// a bit of adjusting and testing here - which api's yield the best results
function getArtist(dataObject, returnedData, cogsData, lastData) {

  console.log(dataObject)
  console.log(cogsData)
  console.log(lastData)
  // console.log(returnedData.dataObject) // all undefined again! really need to learn this one!!!
  // console.log(returnedData.cogsData)
  // // begin re-assigning!
  // console.log(dataObject.results[0])
  // console.log(cogsData)
  console.log(dataObject);
  // console.log(dataObject[0].results);
  console.log(dataObject[1].artist);

  // this is the point I thought, this is NOT RIGHT!

  if (dataObject && dataObject[0]) {
    console.log(dataObject[0].results);
  } else {
    console.log("dataObject or dataObject[0] is undefined");
  }

  if (dataObject && dataObject[1]) {
    console.log(dataObject[1].artist);
  } else {
    console.log("dataObject or dataObject[0] is undefined");
  }
  

  // console.log(cogsData.results[0].cover_image)
  // console.log(data[1])
  // console.log(data[0].results)
  // console.log(data[0].results[1].cover_image) // when creating a temp1 global in console this works? 

  // // const dataObject = [{...}, {...}];
  // const firstItem = data[0];

  // const secondItem = data[1];

  // console.log(firstItem)
  // console.log(secondItem)


  // // define full array
  // const artistArray = data.results[0]
  // console.log(artistArray)

  // // define an element of data
  // const artistUnknown = artistArray.artist
  // console.log(artistUnknown) // undefined

  // // grab artist name ONLY [0]
  // const artist = data.results[1].title
  // console.log(artist)

  // // define artist and album title
  // const title = artistArray.title
  // console.log(title) // fetches the artist album name

  // // define cover image
  // const artwork = artistArray.cover_image
  // console.log(artwork)

  // return data;
}