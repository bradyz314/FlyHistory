console.log('injected')

// Helper function that will scrape relevant data from booking page
function scrape_booking(url) {
    // Regex expression to check if provided URL corresponds to a Google Flights booking page
    const booking_regex = /.*\.google\.com\/travel\/flights\/booking*/;
    // If the URL is the booking page, scrape the data.
    if (booking_regex.test(url)) {
        // Fetch the document content asyncronously
        fetch(url)
        .then(response => response.text())
        .then(html => {
            // Parse the HTML string into a DOM object
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Now you can access the current document object (doc)
            const divs = doc.querySelectorAll('div')
            console.log(divs.length)
            // Your scraping logic here
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
