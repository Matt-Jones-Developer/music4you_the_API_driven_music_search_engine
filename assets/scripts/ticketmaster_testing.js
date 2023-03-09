// break the issue down!
// I cannot access the second fetch data ??

let ticketMasterAPIKey = "&apikey=GbIS7ZHqNdNaR8p53t0s3R87G5IbJWSB";

// get a reference to the modal and close button
let modalWindow = document.querySelector(".ticket-modal");

// reference to the new eventCard DOM element
let eventCard = document.querySelector(".event-card");

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

  // let ticketModalDiv = document.querySelector('.ticket-modal')

  // insert the modal into the DOM
  document.body.insertAdjacentHTML("beforeend", modal);

  // // get a reference to the modal and close button
  // let modalWindow = document.querySelector(".ticket-modal");

  // // reference to the new eventCard DOM element
  // let eventCard = document.querySelector(".event-card");
  // let closeButton = document.querySelector(".close");

  // // handle the close button click event
  // closeButton.addEventListener("click", function () {
  //   modalWindow.style.display = "none";
  // });

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
          modal.innerHTML +=
            `<div class="card event-card">
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
  // Create a click event listener for the event card
  // eventCard.addEventListener("click", function () {
  //   // Call the ticketModal function with the relevant information
  //   ticketModal(artistName, eventsTotal, eventDate);
  // });
  document.querySelector(".eventLabel").addEventListener("click", function () {
    modalWindow.style.display = "block";
  });

  // Append the event card to the modal body
  // const modalBody = document.querySelector(".modal-body");
  // modalBody.appendChild(eventCard);


}

// const ticketsButton = document.querySelector(".tickets-saved-card")
// // the new ticketmaster ticket info button event listener:
// // event listener for tickets button [TODO] - fetch API and render data
// ticketsButton.addEventListener('click', function () {

//   // retrieve that artists ticketmaster data (if any)
//   console.log("ticketmaster called")
//   // call the fetchTM function
//   // redefine artistName
//   let artistName = currentArtist.artistName;
//   // call fetch TM data 
//   fetchTM(artistName)
//   // // modal ticket - this is called within ticketmaster js
//   // ticketModal(artistName)
//   // if saved artist its - currentArtist.artistName
//   // if newly added its artistName to access the artists name to search TM

//   // generate a modal to display the info
//   // could offer more buttons within it to search site, check touring dates etc
//   // if not touring - generate 'generic no tours found' message

// })

// // ticket modal function
// function ticketModal(artist, eventDate, eventStart, buyTicket, venueName) {
//   console.log('ticketmaster modal called')
//   showModal()
//   // stop more being added! (remove them if exist)
//   const previousModal = document.querySelector(".modal-dialog");
//   if (previousModal) {
//     previousModal.remove();
//   }
//   // attached to event listener
//   // create the modal div 
//   const ticketModalDiv = document.createElement("div");
//   ticketModalDiv.classList.add("ticket-modal",
//     "modal-dialog", "modal-dialog-centered", "modal-dialog-scrollable")
//   ticketModalDiv.innerHTML = '';
//   ticketModalDiv.innerHTML = `
//       <div class="modal-content">
//         <div class="modal-header custom-header justify-content-center">
//         <h2 class="modalTitle"><i class="fa-solid fa-ticket"></i> TICKETMASTER INFO <i class="fa-solid fa-ticket"></i></h2>
//         <h1>${artistName}</h1>
//         </div>
//         <div class="modal-body justify-content-center">
//           <!-- ticket master info pulled -->
//           <div class="row g-3 align-items-left app-tickets-modal">
//             <div class="col-auto justify-content-center modal-data-helper">
//               <span id="helperInline" class="form-text">
//                 We are grabbing all ticketmaster info for you now!
//               </span>
//               <ul class="list-group list-group-flush info-list">
//                 <li class="list-group-item active artist-event-count has-events">
//                 <h2>${artistName} has </h2><h1><b>${eventsTotal}</b></h1> <h3>upcoming events!</h3>
//                 </li>
//               </ul>
//               <div class="buy-button">
//                 <p>
//                 Buy available tickets for upcoming shows via TicketMaster with one click!
//                 </p>
//               </div>
//               <button class="btn" type="button"><a href="${ticketmasterSiteLogin}">Buy Tickets</a></button>
//             </div>
//           </div>
//         </div>
//         <div class="modal-footer">
//           <button type="button" class="btn btn-secondary" id="close-modal" data-bs-dismiss="modal">Close</button>
//         </div>
//       </div>`

//   // append the modal to the DOM
//   errorModalEl.appendChild(ticketModalDiv);

//   // if close X clicked - close the modal
//   const closeButton = document.querySelector('#close-modal');
//   closeButton.addEventListener('click', function () {
//     hideModal()
//   });
// }

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


