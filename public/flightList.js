const flightList = document.getElementById('flight-list');

function getAllTrips() {
    var tripsData = localStorage.getItem('trips');
    return tripsData ? JSON.parse(tripsData) : [];
}

const allTrips = getAllTrips();

// const testFlights = [
//     {
//         airline: 'Frontier',
//         origin: 'PHL',
//         destination: 'MCO',
//         departureTime: '8:45 AM',
//         arrivalTime: '11:34 AM',
//         duration: '2 hr 49 min',
//         stops: 'Nonstop',
//         price: 500,
//         num_stops: 3
//     },
// ];

function createFlightInfoElement(flight) {
    const flightInfoElement = document.createElement('div');
    flightInfoElement.classList.add('flight-info');

    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('details');

    const timeDiv = document.createElement('div');
    // timeDiv.textContent = `${flight.departureTime} ➡ ${flight.arrivalTime}`;
    timeDiv.textContent = `${flight.flights}`;

    const airportDiv = document.createElement('div');
    airportDiv.textContent = `${flight.origin} ${flight.destination}`;

    const durationDiv = document.createElement('div');
    // durationDiv.textContent = `${flight.stops} · ${flight.duration} · ${flight.airline}`;

    if (flight.note) {
        const noteDiv = document.createElement('div');
        noteDiv.textContent = flight.note;
        detailsDiv.appendChild(noteDiv);
    }

    detailsDiv.appendChild(timeDiv);
    detailsDiv.appendChild(airportDiv);
    detailsDiv.appendChild(durationDiv);

    const priceStopsContainer = document.createElement('div');
    priceStopsContainer.classList.add('price-stops-container');

    const priceDiv = document.createElement('div');
    priceDiv.classList.add('price');
    priceDiv.textContent = `${flight.price}`;

    const stopsDiv = document.createElement('div');
    stopsDiv.classList.add('flight_type');
    stopsDiv.textContent = `${flight.flight_type}`;

    priceStopsContainer.appendChild(priceDiv);
    priceStopsContainer.appendChild(stopsDiv);

    flightInfoElement.appendChild(detailsDiv);
    flightInfoElement.appendChild(priceStopsContainer);

    return flightInfoElement;
}

function updateOrder(allTrips, price, stops, order) {

    if (order == 'price-asc') {
        allTrips.sort((a, b) => {
              return a.price - b.price;
            });
    } else if (order === 'price-desc') {
        allTrips.sort((a, b) => {
            return b.price - a.price;
          });
    } else if (order === 'stops-asc') {
        allTrips.sort((a, b) => {
            return a.num_stops - b.num_stops;
          });
    } else if (order === 'stops-desc') {
        allTrips.sort((a, b) => {
            return b.num_stops - a.num_stops;
          });
    }

    renderFlights(price, stops);
    
}

function renderFlights(allTrips) {
    flightList.innerHTML = '';
    allTrips.forEach(flight => {
        const flightInfoElement = createFlightInfoElement(flight);
        flightList.appendChild(flightInfoElement);
    });
}

renderFlights(allTrips);

/*

function renderFlightsByPrice(maxPrice) {

    flightList.innerHTML = '';
    testFlights.forEach(flight => {
        if (flight.price <= maxPrice) {
            const flightInfoElement = createFlightInfoElement(flight);
            flightList.appendChild(flightInfoElement);
        
    });
}

function renderFlightsByStops(maxStops) {

    flightList.innerHTML = '';
    testFlights.forEach(flight => {
        if (flight.num_stops <= maxStops) {
            const flightInfoElement = createFlightInfoElement(flight);
            flightList.appendChild(flightInfoElement);
        }
    });
}
*/