// break the issue down!
// I cannot access the second fetch data ??

let ticketMasterAPIKey = "&apikey=GbIS7ZHqNdNaR8p53t0s3R87G5IbJWSB";


function fetchTM(artistName) {
  let attractionFullUrl = "https://app.ticketmaster.com/discovery/v2/attractions.json?&keyword=" + artistName + ticketMasterAPIKey;
  // let eventListings;

  console.log(artistName)
  // fetch the TM data
  fetch(attractionFullUrl)
    .then(res => res.json())
    .then(data => {
      console.log(data._embedded.attractions[0])
      if (data._embedded.attractions[0].upcomingEvents.tmr >= 0) {
        console.log("Upcoming Events:", data._embedded.attractions[0].upcomingEvents.tmr);
        // define eventsTotal as a variable 
        let eventsTotal = data._embedded.attractions[0].upcomingEvents.tmr;
        console.log('eventsTotal:', eventsTotal)
        let tmURL = data._embedded.attractions[0].url
        console.log('BUY tickets button URL:', tmURL)
        let artistID = data._embedded.attractions[0].id
        console.log('artistID:', artistID)

        // call fetch dates
        fetchAndRenderAllDates(artistID)

      }

    })
}

function fetchAndRenderAllDates(artistID) {

  // create a modal
  let modal = `
  <div class="ticket-modal">
    <div class="modal-content">
      <span class="close">&times;</span>
      <div class="eventLabel"></div>
    </div>
  </div>
`;

  // insert the modal into the DOM
  document.body.insertAdjacentHTML("beforeend", modal);

  // get a reference to the modal and close button
  let modalWindow = document.querySelector(".ticket-modal");
  let closeButton = document.querySelector(".close");

  // handle the close button click event
  closeButton.addEventListener("click", function () {
    modalWindow.style.display = "none";
  });

  let eventsFullUrl = "https://app.ticketmaster.com/discovery/v2/events.json?&attractionId=" + artistID + ticketMasterAPIKey


  // handle the fetch event
  fetch(eventsFullUrl)
    .then(res => res.json())
    .then(data => {
      let eventListings = data._embedded.events;

      for (let i = 0; i < eventListings.length; i++) {
        let event = eventListings[i];

        let artist = event.name;
        let eventDate = event.dates.start.localDate;
        let eventStart = event.dates.start.localTime;
        let buyTicket = event.url;
        let venueName = event._embedded.venues[0].name;
        // closure
        (function (artist, eventDate, eventStart, buyTicket, venueName) {
          document.querySelector(".eventLabel").innerHTML +=
            `<div class="card">
              <div class="card-body">
                <h5 class="card-title">Artist: ${artist}</h5>
                <p class="card-text">Date: ${eventDate}</p>
                <p class="card-text">Start Time: ${eventStart}</p>
                <a href="${buyTicket}" target="_blank" class="btn btn-primary">Get Tickets</a>
                <p class="card-text">Venue: ${venueName}</p>
              </div>
            </div>
            `
        })(artist, eventDate, eventStart, buyTicket, venueName);
      }
    });

  // handle the click event on the event label
  document.querySelector(".eventLabel").addEventListener("click", function () {
    modalWindow.style.display = "block";
  });


}

// CORS violation this way!

// function fetchAndRenderAllDates(artistID) {
//   fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${ticketMasterAPIKey}&artistId=${artistID}`)
//     .then(response => response.json())
//     .then(data => {
//       // Get the events array from the data object
//       const events = data._embedded.events;

//       // Iterate over the events array
//       events.forEach(event => {
//         // Get the relevant information for the event
//         const artistName = event.name;
//         const eventsTotal = events.length;
//         const eventDate = event.dates.start.localDate;

//         // Create the event card
//         const eventCard = document.createElement("div");
//         eventCard.classList.add("card", "bg-dark", "eventLabel");
//         eventCard.innerHTML = `
//           <h3>Date: ${eventDate}</h3>
//         `;

//         // Create a click event listener for the event card
//         eventCard.addEventListener("click", function () {
//           // Call the ticketModal function with the relevant information
//           ticketModal(artistName, eventsTotal, eventDate);
//         });

//         // Append the event card to the modal body
//         const modalBody = document.querySelector(".modal-body");
//         modalBody.appendChild(eventCard);
//       });
//     });
// }


