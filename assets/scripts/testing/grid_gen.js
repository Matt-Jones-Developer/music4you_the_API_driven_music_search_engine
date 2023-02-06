// determining how to add a new card to a grid each onClick

// what do want the function to do?

// create a grid container 

// when user clicks "search" button (onClick event) ->
// trigger the function addToGrid() ->
// a new card is generated and added to the grid container

// within addToGrid() ->
// create the new card (div class "card")
// add the content (dynamically to card)
// append it to the container 

// we have a function that basically performs this already,
// so why is it appending to the same card slot?
// BECAUSE we have not told it to append to the next grid col

// global card index ?
let index = 0;

// the button that will trigger the event 
const searchBtn = document.querySelector(".search-button")
// specify the div to create a card in (grid container)
const gridContainer = document.querySelector("#grid-container")
// a test image to add to the grid 
const testImage = "./assets/images/vinyl-record.png"

// the onClick handler
searchBtn.addEventListener("click", function (event) {
  event.preventDefault()

  // on click -> add an image for example
  // call renderCard function
  renderCard()

});

// the renderCard function 
function renderCard() {
  // container per card for centering 
  const cardContainer = document.createElement("div")
  // add a class
  cardContainer.classList.add("card-cont")
  // add a fixed width and centered margin
  cardContainer.style = "width: 100%", "margin: 0 auto";
  // create new card element
  const card = document.createElement("div");
  // set its class to "card"
  card.classList.add("card");
  card.classList.add("col-lg-3", "col-md-6", "col-sm-12"); // col-4 here, not card
  // set card attributes
  card.setAttribute("data-name", "artist name");
  card.setAttribute("data-index", ++index);
  // create the variables to access these attr
  let cardIndex = card.getAttribute("data-index");
  let cardName = card.getAttribute("data-name");
  // define a card size?
  card.style.width = "395px"
  card.style.height = "400px"
  // build the card elements
  // create card body
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  // add title
  const artistEl = document.createElement("h3");
  artistEl.textContent = `card: ${cardIndex} ${cardName}`;
  // add the image 
  const albumArtEl = document.createElement("img");
  // add a class name 
  albumArtEl.classList.add("album-img")
  // specify image src 
  albumArtEl.src = `${testImage}`;
  // set img styling 
  albumArtEl.style.width = "300px";
  albumArtEl.style.height = "300px";

  // do we append here?
  // appending
  card.append(artistEl); // genreEl for just lastFM or genreMixEl for both
  cardBody.append(albumArtEl)
  card.appendChild(cardBody)
  gridContainer.appendChild(card);

}