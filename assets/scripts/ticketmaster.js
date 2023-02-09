

// force buy ticket to ticketmaster login (temp)
let ticketmasterSiteLogin = "https://www.ticketmaster.com/member/login"
let eventLabel = document.querySelector(".eventLabel")

function fetchTM(artistName) {

  let ticketMasterAPIKey = "&apikey=GbIS7ZHqNdNaR8p53t0s3R87G5IbJWSB";
  let attractionFullUrl = "https://app.ticketmaster.com/discovery/v2/attractions.json?&keyword=" + artistName + ticketMasterAPIKey;
  let eventListings;

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

        let eventsFullUrl = "https://app.ticketmaster.com/discovery/v2/events.json?&attractionId=" + artistID + ticketMasterAPIKey

        // fetch for each event
        fetch(eventsFullUrl)
          .then(res => res.json())
          .then(data => {

            let eventListings = data._embedded.events;

            for (let i = 0; i < eventListings.length; i++) {
              let event = eventListings[i];
              console.log("ArtistName:", eventListings[i].name)
              // create on-the-fly vars
              // name 
              let artist = event.name;
              console.log('var artist:', artist)
              console.log("date:", event.dates.start.localDate)
              // date 
              let eventDate = event.dates.start.localDate;
              console.log('var eventDate: ', eventDate)
              console.log("StartTime:", event.dates.start.localTime)
              // start time 
              let eventStart = event.dates.start.localTime;
              console.log('var eventStart: ', eventStart)
              // ticket url link (for href button)
              console.log("get tickets href:", event.url)
              let buyTicket = event.url;
              console.log('var buyTicket:', buyTicket)
              // all the venue info
              console.log("venue name:", event._embedded.venues[0].name)
              let venueName = event._embedded.venues[0].name;
              // location (all data)
              let location = event._embedded.venues[0];
              console.log('location(all arrays):', location)
              // we want the state, country
              // console.log('address: ', location.name.address.line1)
              console.log('venue address:', eventListings[i]._embedded.venues[0].address)
              console.log("venue details (address, city, state, country, zip:",
                eventListings[i]._embedded.venues[0].address,
                eventListings[0]._embedded.venues[0].city,
                eventListings[0]._embedded.venues[0].state,
                eventListings[0]._embedded.venues[0].country,
                eventListings[0]._embedded.venues[0].postalCode)

            }
            // modal ticket - add all the args that the modal needs 
            ticketModal(artistName, eventsTotal, ticketmasterSiteLogin)
          })

      }
      else {
        console.log("No Upcoming Events")
        // call noTourModal
        noTourModal(artistName)

      }

    })
}


