// Helper function that will scrape relevant data from booking page
function scrape_booking(url) {
    // Regex expression to check if provided URL corresponds to a Google Flights booking page
    const booking_regex = /.*\.google\.com\/travel\/flights\/booking*/;
    const one_way_regex = /(.*) to (.*)/;
    const round_trip_regex = /(.*) to (.*) and back/;
    // If the URL is the booking page, scrape the data.
    if (booking_regex.test(url)) {
        // Get the text related divs in the document
        const text_divs = document.querySelectorAll('div[role="text"]');
        // Get the aria-label for the origin and destination of the flights (null if it's a multi-city trip)
        const location_div_label = text_divs[0].getAttribute('aria-label');
        // Get the nested span containing the price of the flights
        const price_span_content = text_divs[1].querySelector('div span').textContent;
        // Match label on one_way_regex and round_trip_regex
        const one_way_match = location_div_label.match(one_way_regex);
        const round_trip_match = location_div_label.match(round_trip_regex);
        const is_round_trip = round_trip_match !== null;
        // Extract capture groups from the corresponding regex pattern
        const origin = is_round_trip ? round_trip_match[1] : one_way_match[1];
        const destination = is_round_trip ? round_trip_match[2] : one_way_match[2];
        console.log(is_round_trip, origin, destination, price_span_content);
    }
}

// Add an event listener that will call scrape_booking on the popstate event
window.addEventListener('popstate', () => { 
    // scrape_booking(window.location.href);
    const booking_regex = /.*\.google\.com\/travel\/flights\/booking*/;
    const url = window.location.href;
    if (booking_regex.test(url)) {
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
        }, 1000);
    });
    domObserver.observe(document.body, { childList: true, subtree: true });
})
