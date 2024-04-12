console.log('injected')

// Helper function that will scrape relevant data from booking page
function scrape_booking(url) {
    // Regex expression to check if provided URL corresponds to a Google Flights booking page
    const booking_regex = /.*\.google\.com\/travel\/flights\/booking*/;
    const one_way_regex = /(.*) to (.*)/;
    const round_trip_regex = /(.*) to (.*) and back/;
    // If the URL is the booking page, scrape the data.
    if (booking_regex.test(url)) {
        // Fetch the document content asyncronously
        fetch(url)
        .then(response => response.text())
        .then(html => {
            // Parse the HTML string into a DOM object
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            // First, scrape the flight's starting and end points (ignore multi-city trips for now)
            const location_div_label = Array.from(doc.querySelectorAll('*')).find(element => 
                element.getAttribute('aria-label')?.toLowerCase().includes('to')
            ).getAttribute('aria-label');
            // Match label on one_way_regex and round_trip_regex
            const one_way_match = location_div_label.match(one_way_regex);
            const round_trip_match = location_div_label.match(round_trip_regex);
            const is_round_trip = round_trip_match !== null;
            // Extract capture groups from the corresponding regex pattern
            const origin = is_round_trip ? round_trip_match[1] : one_way_match[1];
            const destination = is_round_trip ? round_trip_match[2] : one_way_match[2];
            console.log(is_round_trip, origin, destination);
        })
        .catch(error => {
            console.error('Error fetching document:', error);
        });
    }
}

// Call scrape_booking on injection in case the user has directly clicked on the booking page
scrape_booking(window.location.href);
// Add an event listener that will call scrape_booking on the popstate event
window.addEventListener('popstate', () => { 
    // Fetch the current document content asynchronously
    scrape_booking(window.location.href);
});
