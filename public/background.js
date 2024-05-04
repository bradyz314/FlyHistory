/* global chrome */

chrome.runtime.onMessage.addListener(
    (request, _) => {
        chrome.storage.local.get({'flights': []}, (result) => {
            let flights = result.flights;
            if (request.event === 'add_flight') {
                // Create a new flight with a unique ID and the trip's details.
                const new_flight = {
                    id: Date.now(),
                    flight_type: request.data.flight_type,
                    origin: request.data.origin,
                    class: request.data.class,
                    destination: request.data.destination,
                    price: request.data.price,
                    flights: request.data.flights,
                    flight_url: request.data.flight_url
                };
                // Check if the flight is a duplicate (by comparing URLs)
                let duplicate_idx = -1;
                for (let i = 0; i < flights.length; i++) {
                    if (flights[i]['flight_url'] === new_flight['flight_url']) {
                        duplicate_idx = i;
                        break;
                    }
                }
                if (duplicate_idx === -1) {
                    flights.push(new_flight);
                } else {
                    flights[duplicate_idx] = new_flight;
                }
                console.log(duplicate_idx, flights);
                chrome.storage.local.set({ flights: flights });
            }
        });
    }
)