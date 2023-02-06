// OK, so struggling with removing the correct array item
// Let's solve this.

// update - an ENTIRE SUNDAY LOL

// SOLVED: look through what is being fetched (logs) -
// some were capitalised, some werent!

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

  // // remove card event 
  // removeButton.addEventListener('click', function (event) {
  //   event.preventDefault();

  //   // grab the card index
  //   // issue? we are saying match the data-name id to the name in the array? OK!
  //   let cardIndex = card.getAttribute('data-name');
  //   console.log('cardIndex =', cardIndex);
  //   console.log('type of card index:', typeof (cardIndex));

  //   // via index
  //   // we cannot use index here, since the index will never change AFTER another card has been removed!!
  //   // let index = Number(cardIndex) - 1; // close, but it leaves 1 behind and removes 2nd instead of 3rd?
  //   // let index = searchHistory.indexOf(cardIndex); // works!! almost.. with 4 cards, removing the 3rd item keeps the 3rd items array name? we want the 4th to remain, the 3rd to go?
  //   // find the index
  //   // let index = searchHistory.findIndex(function (historyItem) { // this ONLY removes index 1!! (the opposite)
  //   //   console.log(historyItem)
  //   //   return historyItem === cardIndex;
  //   // });
  //   // filter the searchHistory array
  //   searchHistory = searchHistory.filter(function (historyItem) {
  //     return historyItem !== cardIndex;
  //   });
  //   // console.log('index (cardIndex -1) =', index);
  //   console.log('index (cardIndex) =', index);
  //   console.log('searchHistory before splice: ', searchHistory);
  //   // // remove the card
  //   // card.remove();
  //   // // remove the item from the searchHistory array
  //   // if (index !== -1) {
  //   //   searchHistory.splice(index, 1);
  //   //   console.log('searchHistory after splice: ', searchHistory);

  //   //   // remove the item from local storage
  //   //   let savedArtists = JSON.parse(localStorage.getItem("savedArtists") || "[]");
  //   //   savedArtists.splice(index, 1);
  //   //   localStorage.setItem("savedArtists", JSON.stringify(savedArtists));
  //   // } else {
  //   //   console.log('no match, cannot remove')
  //   // }

  //   // filter the savedArtists array
  //   let savedArtists = JSON.parse(localStorage.getItem("savedArtists") || "[]");
  //   savedArtists = savedArtists.filter(function (artist) {
  //     return artist !== cardIndex;
  //   });
  //   localStorage.setItem("savedArtists", JSON.stringify(savedArtists));

  //   // // remove the card
  //   card.remove();

  // removeButton.addEventListener('click', function (event) {
  //   event.preventDefault();

  //   // grab the card index
  //   let cardIndex = card.getAttribute('data-name');
  //   console.log('cardIndex =', cardIndex);

  //   // remove the item from the searchHistory array using filter
  //   // let index = searchHistory.findIndex(item => item === cardIndex);
  //   console.log('searchHistory before filter: ', searchHistory);

  //   // remove the item from the searchHistory array using filter
  //   searchHistory = searchHistory.filter(function (historyItem) {
  //     return historyItem !== cardIndex;
  //   });
  //   console.log('searchHistory after filter: ', searchHistory);

  //   // remove the item from local storage using filter
  //   let savedArtists = JSON.parse(localStorage.getItem("savedArtists") || "[]");
  //   savedArtists = savedArtists.filter(function (historyItem) {
  //     return historyItem !== cardIndex;
  //   });
  //   localStorage.setItem("savedArtists", JSON.stringify(savedArtists));

  //   // remove the card
  //   card.remove();

  // });


// let itemArray = ['one', 'two', 'three']

// Remove the second item
// itemArray.splice(1, 1);

// console.log(itemArray);  // Output: ['one', 'three']

// // Remove the first item
// // itemArray.splice(0, 1);

// console.log(itemArray);  // Output: ['three']

// OK, we know this much.

// what about finding an index based on a matching data- ?

// includes
// let isFound = itemArray.includes('two')
// if (isFound) {
//   console.log(isFound)
// }
// console.log(itemArray)
// filter??
// let filteredArray = itemArray.filter(function (element) { 
//   return element.id === 0;
//   console.log(filteredArray)
// });

// how to do a simplified version of the indexing issue when adding/removing items?

// // add the elements we'll need
// const searchBtn = document.querySelector(".search-button")
// const userSearch = document.querySelector("#search-input")
// const removeBtn = document.querySelector("#remove-button")

// // add the searchRequest let and the array
// let searchRequest;

// // array to store history
// let searchHistory = []
// console.log("history array is empty:", searchHistory)

// // event listener
// searchBtn.addEventListener("click", function (event) {
//   event.preventDefault()

//   // define the request
//   searchRequest = userSearch.value
//   console.log("user searched for:", searchRequest)

//   // update the array
//   searchHistory.push(searchRequest)
//   console.log(searchHistory)

// })

// // add the remove button (for testing)
// removeBtn.addEventListener('click', function (event) {
//   event.preventDefault();

//   // which button to remove?
//   searchHistory.splice(1,1)
//   console.log(searchHistory)
// });


// here's all the failed attempts to fix my code!!

    // document.querySelector('.remove-card')
    // removeButton.addEventListener('click', function (event) {

    //   event.preventDefault()

    //   // grab the card index or data-name 

    //   // remove card, array and local item 
    //   card.remove()
    //   // when we remove card via indexing - remember to +1 to array index
    //   let is = card.getAttribute('data-index');
    //   console.log('is =', is);
    //   console.log('type:', typeof (is));
    //   let i = Number(is);
    //   console.log('i =', i)
    //   // searchHistory.removeByValue(whichArtist)
    //   searchHistory.splice(i, 1);
    //   // new array
    //   console.log('array was edited: ', searchHistory)
    //   // how to find the correct array item?
    //   localStorage.savedArtists = JSON.stringify(JSON.parse(localStorage.savedArtists ?? "[]").slice(0, -1));

    // })

    // here I fixed the code since i was not working correctly;
    // you need to decrement from i to get the correct array item removed

    // removeButton.addEventListener('click', function (event) {

    //   event.preventDefault()

    //   // grab the card index or data-name 
    //   let is = card.getAttribute('data-index');
    //   console.log('is =', is);
    //   console.log('type:', typeof (is));
    //   let i = Number(is) - 1; // subtract 1 to get the correct array index
    //   console.log('i =', i)

    //   // remove card, array and local item 
    //   card.remove()
    //   // searchHistory.removeByValue(whichArtist)
    //   let i = Number(is) - 1;
    //   searchHistory.splice(i, 1);
    //   // new array
    //   console.log('array was edited: ', searchHistory)
    //   // update local storage
    //   localStorage.savedArtists = JSON.stringify(searchHistory);
    // })

    // the issue is clear now.  Once an item has been removed, the index-1 will not work as intended.
    // solution: create a new array of the items and re-index them each time

    // removeButton.addEventListener('click', function (event) {
    //   event.preventDefault();

    //   // grab the card index
    //   let cardIndex = card.getAttribute('data-index');
    //   console.log('cardIndex =', cardIndex);
    //   console.log('type:', typeof (cardIndex));
    //   let index = Number(cardIndex) - 1;
    //   console.log('index =', index);
    //   // remove the card
    //   card.remove();
    //   // remove the item from the searchHistory array
    //   searchHistory.splice(index, 1);
    //   console.log('searchHistory after splice: ', searchHistory);

    //   // remove the item from local storage
    //   let savedArtists = JSON.parse(localStorage.getItem("savedArtists") || "[]");
    //   savedArtists.splice(index, 1);
    //   localStorage.setItem("savedArtists", JSON.stringify(savedArtists));
    // });

    // creating a separate array of the saved artists in local storage, removing the item from that array, and then setting the updated array back in local storage

    // still doesn't work correctly!!! arrrgg
    // ok, scrap index altogether and access via data-names only

    // removeButton.addEventListener('click', function (event) {
    //   event.preventDefault();

    //   // grab the card index
    //   let cardIndex = card.getAttribute('data-index');
    //   console.log('cardIndex =', cardIndex);
    //   console.log('type:', typeof (cardIndex));
    //   let index = Number(cardIndex);
    //   console.log('index =', index);
    //   // remove the card
    //   card.remove()
    //   // remove the item from the searchHistory array
    //   searchHistory.splice(index, 1);
    //   console.log('searchHistory after splice: ', searchHistory);

    //   // remove the item from local storage
    //   let savedArtists = JSON.parse(localStorage.getItem("savedArtists") || "[]");
    //   let artistToRemove = savedArtists[index];
    //   let newSavedArtists = savedArtists.filter(artist => artist !== artistToRemove);
    //   localStorage.setItem("savedArtists", JSON.stringify(newSavedArtists));
    // });

    // does not remove the array or storage
    // removeButton.addEventListener('click', function (event) {
    //   event.preventDefault();

    //   // grab the card's data-name
    //   let cardName = card.getAttribute('data-name');
    //   console.log('cardName =', cardName);
    //   console.log('type:', typeof (cardName));

    //   // remove the card
    //   card.remove()

    //   // remove the item from the searchHistory array
    //   let index = searchHistory.indexOf(cardName);
    //   if (index !== -1) {
    //     searchHistory.splice(index, 1);
    //     console.log('searchHistory after splice: ', searchHistory);
    //   }

    //   // remove the item from local storage
    //   let savedArtists = JSON.parse(localStorage.getItem("savedArtists") || "[]");
    //   index = savedArtists.indexOf(cardName);
    //   if (index !== -1) {
    //     savedArtists.splice(index, 1);
    //     localStorage.setItem("savedArtists", JSON.stringify(savedArtists));
    //   }
    // });

    // removeButton.addEventListener('click', function (event) {
    //   event.preventDefault();

    //   // grab the card's data-name
    //   let artistName = card.getAttribute('data-name');
    //   console.log('artistName =', artistName);
    //   console.log('type:', typeof (artistName));

    //   // remove the card
    //   card.remove();

    //   // remove the item from the searchHistory array
    //   let indexName = searchHistory.indexOf(artistName);
    //   // if (indexName) { // or === artistName?
    //   if (indexName !== -1) {
    //     searchHistory.splice(indexName, 1);
    //     console.log('searchHistory after splice: ', searchHistory);
    //     console.log('type:', typeof (artistName)); 
    //     console.log('type:', typeof (searchHistory[0]));
    //   }

    //   console.log('searchHistory after splice: ', searchHistory);
    //   console.log('type:', typeof (artistName)); 
    //   console.log('type:', typeof (searchHistory[0]));

    //   // // remove the item from local storage
    //   // let savedArtists = JSON.parse(localStorage.getItem("savedArtists") || "[]");
    //   // indexName = savedArtists.indexOf(artistName);
    //   // if (indexName !== -1) {
    //   //   savedArtists.splice(indexName, 1);
    //   //   localStorage.setItem("savedArtists", JSON.stringify(savedArtists));
    //   // }
    // });

    // removeButton.addEventListener('click', function (event) {
    //   event.preventDefault();
  
    //   // grab the card's data-name
    //   let artistName = card.getAttribute('data-name');
    //   console.log('artistName =', artistName);
    //   console.log('type:', typeof (artistName));
  
    //   // remove the card
    //   card.remove();
  
    //   // remove the item from the searchHistory array
    //   let indexName = searchHistory.indexOf(artistName);
    //   console.log('artistName indexOf type:', typeof (artistName));
    //   console.log('indexName indexOf type:', typeof (indexName));
    //   // if (indexName) { // or === artistName?
    //   if (indexName !== -1) {
    //     searchHistory.splice(indexName, 1);
    //     console.log('searchHistory after splice: ', searchHistory);
    //     console.log('type:', typeof (artistName));
    //     console.log('type:', typeof (searchHistory[0]));
    //   }
  
    //   console.log('searchHistory after splice: ', searchHistory);
    //   console.log('type:', typeof (artistName));
    //   console.log('type:', typeof (searchHistory[0]));
  
    //   // remove the item from local storage
    //   let savedArtists = JSON.parse(localStorage.getItem("savedArtists") || "[]");
    //   indexName = savedArtists.indexOf(artistName);
    //   if (indexName !== -1) {
    //     savedArtists.splice(indexName, 1);
    //     localStorage.setItem("savedArtists", JSON.stringify(savedArtists));
    //   }
    // });
  
    // removeButton.addEventListener('click', function (event) {
    //   event.preventDefault();
  
    //   // grab the card's data-name
    //   let artistName = card.getAttribute('data-name');
    //   console.log('artistName =', artistName);
    //   console.log('type:', typeof (artistName));
  
    //   // remove the card
    //   card.remove();
  
    //   // console.log('type of searchHistory[0]:', typeof searchHistory[0]);
  
  
    //   // remove the item from the searchHistory array
    //   // let indexName = searchHistory.findIndex(artistName);
    //   // let indexName = artistName.find;
    //   // console.log('initial log of artistName', artistName)
    //   let indexName = searchHistory.findIndex(item => item === artistName);
    //   console.log('initial log of indexName', artistName, indexName)
    //   // indexName is undefined!
    //   // let indexName = searchHistory.findIndex(item => {
    //   //   console.log(item === artistName);
    //   //   return item === artistName; // returns false!
    //   // });
  
    //   console.log('artistName indexOf type:', typeof (artistName));
    //   console.log('indexName indexOf type:', typeof (indexName));
    //   console.log('type of searchHistory[0]:', typeof searchHistory[0]);
  
    //   // if (indexName) { // or === artistName?
    //   if (indexName !== -1) {
    //     searchHistory.splice(indexName, 1);
    //     console.log('searchHistory after splice: ', searchHistory);
    //     console.log('type:', typeof (artistName));
    //     console.log('type:', typeof (searchHistory[0]));
    //   }
  
    //   console.log('searchHistory after splice: ', searchHistory);
    //   console.log('type:', typeof (artistName));
    //   console.log('type:', typeof (searchHistory[0]));
  
    //   // remove the item from local storage
    //   let savedArtists = JSON.parse(localStorage.getItem("savedArtists") || "[]");
    //   indexName = savedArtists.indexOf(artistName);
    //   if (indexName !== -1) {
    //     savedArtists.splice(indexName, 1);
    //     localStorage.setItem("savedArtists", JSON.stringify(savedArtists));
    //   }
    // });
  
    // removeButton.addEventListener('click', function (event) {
    //   event.preventDefault();
  
    //   // grab the card's data-name
    //   let artistName = card.getAttribute('data-name');
  
    //   // remove the card
    //   card.remove();
  
    //   // remove the item from the searchHistory array
    //   let indexName = searchHistory.findIndex(item => item === artistName);
  
    //   if (indexName !== -1) {
    //     searchHistory.splice(indexName, 1);
    //   }
  
    //   // remove the item from local storage
    //   let savedArtists = JSON.parse(localStorage.getItem("savedArtists") || "[]");
    //   indexName = savedArtists.indexOf(artistName);
    //   if (indexName !== -1) {
    //     savedArtists.splice(indexName, 1);
    //     localStorage.setItem("savedArtists", JSON.stringify(savedArtists));
    //   }
    // });
  
    // removeButton.addEventListener('click', function (event) {
    //   event.preventDefault();
  
    //   // grab the card's data-name
    //   let artistName = card.getAttribute('data-name');
  
    //   // remove the card
    //   card.remove();
  
    //   // remove the item from the searchHistory array
    //   let indexName = searchHistory.indexOf(artistName);
    //   if (indexName !== -1) {
    //     searchHistory.splice(indexName, 1);
    //   }
  
    //   // remove the item from local storage
    //   let savedArtists = JSON.parse(localStorage.getItem("savedArtists") || "[]");
    //   indexName = savedArtists.indexOf(artistName);
    //   if (indexName !== -1) {
    //     savedArtists.splice(indexName, 1);
    //     localStorage.setItem("savedArtists", JSON.stringify(savedArtists));
    //   }
    // });

  // let searchHistory = ['artist1', 'artist2', 'artist3', 'artist4'];

//   // sample card element
// const card = {
//   getAttribute: function(attribute) {
//     if (attribute === 'data-name') {
//       return 'artist2';
//     }
//   }
// };

// // remove button element
// const removeButton = {
//   addEventListener: function(eventType, callback) {
//     if (eventType === 'click') {
//       callback({
//         preventDefault: function() {}
//       });
//     }
//   }
// };

// // remove card event
// removeButton.addEventListener('click', function (event) {
//   event.preventDefault();

//   // grab the card index
//   let cardIndex = card.getAttribute('data-name');
//   console.log('cardIndex =', cardIndex);

//   // use filter to remove the item from the searchHistory array
//   searchHistory = searchHistory.filter(function(historyItem) {
//     return historyItem !== cardIndex;
//   });

//   console.log('searchHistory after filter: ', searchHistory);

//   // remove the item from local storage
//   let savedArtists = JSON.parse(localStorage.getItem("savedArtists") || "[]");
//   savedArtists = savedArtists.filter(function(savedArtist) {
//     return savedArtist !== cardIndex;
//   });
//   localStorage.setItem("savedArtists", JSON.stringify(savedArtists));
// });




  // // remove button element
  // const removeButton = {
  //   addEventListener: function (eventType, callback) {
  //     if (eventType === 'click') {
  //       callback({
  //         preventDefault: function () { }
  //       });
  //     }
  //   }
  // };

  // removeButton.addEventListener('click', function (event) {
  //   event.preventDefault();

  //   // grab the card index
  //   let cardIndex = card.getAttribute('data-name');
  //   console.log('cardIndex =', cardIndex);

  //   // use filter to remove the item from the searchHistory array
  //   searchHistory = searchHistory.filter(function (historyItem) {
  //     return historyItem !== cardIndex;
  //   });

  //   console.log('searchHistory after filter: ', searchHistory);

  //   // remove the item from local storage
  //   let savedArtists = JSON.parse(localStorage.getItem("savedArtists") || "[]");
  //   savedArtists = savedArtists.filter(function (savedArtist) {
  //     return savedArtist !== cardIndex;
  //   });
  //   localStorage.setItem("savedArtists", JSON.stringify(savedArtists));
  // });

  // removeButton.addEventListener('click', function (event) {
  //   event.preventDefault();

  //   let cardIndex = card.getAttribute('data-name');
  //   console.log('cardIndex =', cardIndex);
  //   console.log('type of card index:', typeof (cardIndex));

  //   searchHistory = searchHistory.filter(historyItem => historyItem !== cardIndex);
  //   console.log('searchHistory after filter: ', searchHistory);

  //   // remove the card
  //   card.remove();

  //   // remove the item from local storage
  //   let savedArtists = JSON.parse(localStorage.getItem("savedArtists") || "[]");
  //   savedArtists = savedArtists.filter(artist => artist !== cardIndex);
  //   localStorage.setItem("savedArtists", JSON.stringify(savedArtists));
  // });


  // removeButton.addEventListener('click', function (event) {
  //   event.preventDefault();

  //   // grab the card index
  //   let cardIndex = card.getAttribute('data-name');
  //   console.log('cardIndex =', cardIndex);
  //   console.log('type:', typeof (cardIndex));

  //   let index = searchHistory.indexOf(cardIndex);
  //   if (index !== -1) {
  //     // remove the card
  //     card.remove();
  //     // remove the item from the searchHistory array
  //     searchHistory.splice(index, 1);
  //     console.log('searchHistory after splice: ', searchHistory);

  //     // remove the item from local storage
  //     let savedArtists = JSON.parse(localStorage.getItem("savedArtists") || "[]");
  //     let savedArtistsIndex = savedArtists.indexOf(cardIndex);
  //     savedArtists.splice(savedArtistsIndex, 1);
  //     localStorage.setItem("savedArtists", JSON.stringify(savedArtists));
  //   } else {
  //     console.log('name not found?')
  //   }
  // });