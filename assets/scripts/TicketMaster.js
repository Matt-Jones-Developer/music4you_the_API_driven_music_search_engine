
let artistName = "KatyPerry"
let ticketMasterAPIKey = "&apikey=GbIS7ZHqNdNaR8p53t0s3R87G5IbJWSB"
let attractionFullUrl = "https://app.ticketmaster.com/discovery/v2/attractions.json?&keyword=" + artistName + ticketMasterAPIKey


fetch(attractionFullUrl)
    .then(res => res.json())
    .then(data => {
        console.log(data._embedded.attractions[0])
        if (data._embedded.attractions[0].upcomingEvents.tmr >= 0) {
            console.log("Upcoming Events:", data._embedded.attractions[0].upcomingEvents.tmr);
            let tmURL = data._embedded.attractions[0].url
            console.log(tmURL)
            let artistID = data._embedded.attractions[0].id

            let eventsFullUrl = "https://app.ticketmaster.com/discovery/v2/events.json?&attractionId=" + artistID + ticketMasterAPIKey

            fetch(eventsFullUrl)
                .then(res => res.json())
                .then(data => {

                    let eventListings = data._embedded.events;
                    
                    for (let i = 0; i < eventListings.length; i++) {
                        let element = eventListings[i];
                        console.log("ArtistName:", eventListings[i].name)
                        console.log("StartTime", eventListings[i].dates.start)
                        console.log("get tickets", eventListings[i].url)
                        console.log("venue", eventListings[i]._embedded.venues[0].name)
                        console.log("venue", 
                        eventListings[i]._embedded.venues[0].address, 
                        eventListings[0]._embedded.venues[0].city, 
                        eventListings[0]._embedded.venues[0].state, 
                        eventListings[0]._embedded.venues[0].country, 
                        eventListings[0]._embedded.venues[0].postalCode)

                    }

                })

        }
        else { console.log("No Upcoming Events") }


    })


