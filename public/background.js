/* global chrome */

chrome.runtime.onMessage.addListener(
    (request, _, sendResponse) => {
        console.log(request)
        if (request.event === 'add_flight') {
            // Retrieve existing flights from local storage.
            chrome.storage.local.get({'flights': []}, (result) => {
                const flights = result.flights;
                // Create a new flight with a unique ID and the trip's details.
                const new_flight = {
                    id: Date.now(),
                    data: request.data
                }
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
                    chrome.storage.local.set({ flights });
                    console.log('Success');
                } else {
                    console.log('Duplicate')
                }
                console.log(flights)
            })
        }
    }
)