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
                    destination: request.data.destination,
                    price: request.data.price,
                    flights: request.data.flights,
                    flight_url: request.data.flight_url
                };
                // Check if the flight is a duplicate (by comparing URLs)
                let is_duplicate = false;
                for (let i = 0; i < flights.length; i++) {
                    if (flights[i].data['flight_url'] === new_flight.data['flight_url']) {
                        is_duplicate = true;
                        break;
                    }
                }
                if (!is_duplicate) {
                    flights.push(new_flight);
                    chrome.storage.local.set({ flights: flights });
                }
            }
        });
    }
)