// search elements
const searchBtn = document.querySelector(".search-button")
const userSearch = document.querySelector("#search-input")

// so again, we have a variable 'trapped' inside an event handlers local scope 
// access searchRequest?
// options: make it global?
// or try to return it into the function

// global array to store history
const searchHistory = []
console.log("history array is empty:", searchHistory)

// event listener
searchBtn.addEventListener("click", function (event) {
  event.preventDefault()

  // define the request (local)
  const searchRequest = userSearch.value
  console.log("user searched for:", searchRequest)

  // normally, Id just add searchRequest as an arg!
  getArtist(searchRequest);

  // BUT! when I try this in the main logic - 2 errors:

  // 1. the card is never rendered!!
  // 2. if reverse then IF ELSE -> will always say 'item exists!' (and still not add card)

  // added as conditionals so the event handler instead -  above the fetchData function.
  // after the ifs check for possible errors, the else will run the fetchData, which runs getArtist, which runs renderCard etc

})

// function that needs to check the local 
function getArtist(searchRequest) {
  // conditional - if historyArray contains searched item, do not add another card
  // check if value is in the array

  if (searchHistory.includes(searchRequest)) {
    console.log('value already in the array')

  } else {
    // call a new funct
    testCall()
    // push item to array
    searchHistory.push(searchRequest)
    console.log("new search item added to array: ", searchHistory)
    // save to local 
    localStorage.setItem('search-history', JSON.stringify(searchHistory));

  }

  // array check
  console.log(searchHistory)
}

function testCall() {
  console.log("hello?") // works as expected
}