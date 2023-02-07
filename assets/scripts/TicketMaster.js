
let artistName = "KatyPerry"
let apiKey = "&apikey=GbIS7ZHqNdNaR8p53t0s3R87G5IbJWSB"
let attractionFullUrl = "https://app.ticketmaster.com/discovery/v2/attractions.json?&keyword=" + artistName + apiKey


fetch(attractionFullUrl)
    .then(res => res.json())
    .then(data => {
        console.log(data._embedded.attractions[0])
        if (data._embedded.attractions[0].upcomingEvents.tmr >= 0) {
            console.log("Upcoming Events:", data._embedded.attractions[0].upcomingEvents.tmr);
            let tmURL = data._embedded.attractions[0].url
            console.log(tmURL)
            let artistID = data._embedded.attractions[0].id

            let eventsFullUrl = "https://app.ticketmaster.com/discovery/v2/events.json?&attractionId=" + artistID + apiKey

            fetch(eventsFullUrl)
                .then(res => res.json())
                .then(data => {
                    let eventListings = data._embedded.events
                    

                    for (let i = 0; i < data._embedded.events.length; i++) {
                        let element = data._embedded.events[i];
                        console.log("ArtistName:", data._embedded.events[i].name)
                        console.log("StartTime", data._embedded.events[i].dates.start)
                        console.log("get tickets", data._embedded.events[i].url)
                        console.log("venue", data._embedded.events[i]._embedded.venues[0].name)
                        console.log("venue", data._embedded.events[i]._embedded.venues[0].address, data._embedded.events[0]._embedded.venues[0].city, data._embedded.events[0]._embedded.venues[0].state, data._embedded.events[0]._embedded.venues[0].country, data._embedded.events[0]._embedded.venues[0].postalCode)

                    }

                })

        }
        else { console.log("No Upcoming Events") }








    })


