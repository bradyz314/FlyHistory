/* global chrome */

// Helper function that will scrape relevant data from booking page
function scrape_booking(url) {
    // Regex expression to check if provided URL corresponds to a Google Flights booking page
    const booking_regex = /.*\.google\.com\/travel\/flights\/booking*/;
    const one_way_regex = /(.*) to (.*)/;
    const round_trip_regex = /(.*) to (.*) and back/;
    const date_regex = /^(\w{3}), (\w{3}) (\d*)$/;
    const stop_regex = /(\d*) stop[s]? flight/;
    // If the URL is the booking page, scrape the data.
    if (booking_regex.test(url)) {
        // Get the text related divs in the document
        const text_divs = document.querySelectorAll('div[role="text"]');
        // Get the aria-label for the origin and destination of the flights (null if it's a multi-city trip)
        const location_div_label = text_divs[0].getAttribute('aria-label');
        // Get the nested span containing the price of the flights
        const price_span_content = text_divs[1].querySelector('div span').textContent;
        // Get the divs that contain the airport codes corresponding to the flights (every 2 divs refer to the same flight)
        const airport_code_divs = Array.from(document.querySelectorAll('div')).filter(element => element.className === '' && element.textContent.length === 3);
        // Get the divs that contain the departure and arrival times corresponding to the flights (every 6 divs refer to the same flight -> only use first 2 of every 6)
        const flight_time_divs = Array.from(document.querySelectorAll('div')).filter(element => element.getAttribute('aria-label') !== null && element.getAttribute('aria-label').includes('time'));
        // Get the divs that contain the day of the flights (every div refers to one flight)
        const flight_date_divs = Array.from(document.querySelectorAll('div')).filter(element => date_regex.test(element.textContent))
        // Get the spans that contain the number of stops for each flight
        const flight_stop_spans = Array.from(document.querySelectorAll('span')).filter(element => stop_regex.test(element.getAttribute('aria-label')));
        const flight_type = location_div_label === null ? 'Multi-City Trip' : (location_div_label.match(round_trip_regex) ? 'Round Trip' : 'One Way Trip');
        const flight_class = Array.from(document.querySelectorAll('span')).filter(element => element.getAttribute('aria-label') === ' ')[0].nextSibling.textContent;
        const flight_info = [];
        let origin = null;
        let destination = null;
        // Extract capture groups from the corresponding regex pattern
        if (flight_type !== 'Multi-City Trip') {
            // Match label on one_way_regex and round_trip_regex
            const one_way_match = location_div_label.match(one_way_regex);
            const round_trip_match = location_div_label.match(round_trip_regex);
            origin = flight_type === 'Round Trip' ? round_trip_match[1] : one_way_match[1];
            destination = flight_type === 'Round Trip' ? round_trip_match[2] : one_way_match[2];
        }
        for (let i = 0; i < flight_date_divs.length; i++) {
            flight_info.push({
                'date': flight_date_divs[i].textContent,
                'origin_airport': airport_code_divs[2 * i].textContent,
                'destination_airport': airport_code_divs[2 * i + 1].textContent,
                'departure_time': flight_time_divs[6 * i].textContent,
                'arrival_time': flight_time_divs[6 * i + 1].textContent,
                'num_stops': flight_stop_spans[i] !== undefined ? parseInt(flight_stop_spans[i].textContent) : 0
            });
        }
        
        var tripData = {
            flight_type,
            origin: origin,
            destination,
            price: price_span_content,
            class: flight_class,
            flights: flight_info,
            flight_url: url
        };
        chrome.runtime.sendMessage({
            event: "add_flight",
            data: tripData
        });
    }
}

// Add an event listener that will call scrape_booking on the popstate event
window.addEventListener('popstate', () => { 
    const booking_regex = /.*\.google\.com\/travel\/flights\/booking*/;
    const url = window.location.href;
    if (booking_regex.test(url)) {
        console.log('pop')
        window.location.replace(url);
    }
});

window.addEventListener('load', () => {
    // Define a timer object.
    let timer;
    const domObserver = new MutationObserver((mutationList) => {
        // Whenever a change is observed in the DOM, clear the timer.
        clearTimeout(timer);
        // Set a timer for 1s. If no changes are observed in DOM, scrape the information.
        timer = setTimeout(() => {
            scrape_booking(window.location.href);
            domObserver.disconnect();
        }, 2000);
    });
    domObserver.observe(document.body, { childList: true, subtree: true });
})
