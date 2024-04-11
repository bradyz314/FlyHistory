window.addEventListener('popstate', () => { 
    // Get the current URL.
    const new_url = window.location.href;
    // Define regex pattern to detect the flights booking page.
    const booking_regex = /.*\.google\.com\/travel\/flights\/booking*/;
    // If the URL is the booking page, begin scraping the data.
    if (booking_regex.test(new_url)) {
        console.log("Begin webscraping.");
    } else {
        console.log("No match", new_url);
    }

});
