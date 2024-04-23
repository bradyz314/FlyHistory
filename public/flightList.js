const flightList = document.getElementById('flight-list');

function getAllTrips() {
    var tripsData = localStorage.getItem('trips');
    return tripsData ? JSON.parse(tripsData) : [];
}

const allTrips = getAllTrips();

const testFlights = [
    {
        airline: 'Frontier',
        origin: 'PHL',
        destination: 'MCO',
        departureTime: '8:45 AM',
        arrivalTime: '11:34 AM',
        duration: '2 hr 49 min',
        stops: 'Nonstop',
        price: 500,
        num_stops: 3
    },
    {
        airline: 'Frontier',
        origin: 'PHL',
        destination: 'MCO',
        departureTime: '3:10 PM',
        arrivalTime: '6:00 PM',
        duration: '2 hr 50 min',
        stops: 'Nonstop',
        price: 700,
        num_stops: 1

    },
    {
        airline: 'Spirit',
        origin: 'PHL',
        destination: 'MCO',
        departureTime: '2:12 PM',
        arrivalTime: '4:55 PM',
        duration: '2 hr 43 min',
        stops: 'Nonstop',
        price: 250,
        num_stops: 0,
        note: 'SEPARATE TICKETS BOOKED TOGETHER'
    }
];

function createFlightInfoElement(flight) {
    const flightInfoElement = document.createElement('div');
    flightInfoElement.classList.add('flight-info');

    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('details');

    const timeDiv = document.createElement('div');
    timeDiv.textContent = `${flight.departureTime} ➡ ${flight.arrivalTime}`;

    const airportDiv = document.createElement('div');
    airportDiv.textContent = `${flight.origin} ${flight.destination}`;

    const durationDiv = document.createElement('div');
    durationDiv.textContent = `${flight.stops} · ${flight.duration} · ${flight.airline}`;

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
    priceDiv.textContent = `$${flight.price}`;

    const stopsDiv = document.createElement('div');
    stopsDiv.classList.add('num_stops');
    stopsDiv.textContent = `${flight.num_stops} stop(s)`;

    priceStopsContainer.appendChild(priceDiv);
    priceStopsContainer.appendChild(stopsDiv);

    flightInfoElement.appendChild(detailsDiv);
    flightInfoElement.appendChild(priceStopsContainer);

    return flightInfoElement;
}

function updateOrder(price, stops, order) {

    if (order == 'price-asc') {
        testFlights.sort((a, b) => {
              return a.price - b.price;
            });
    } else if (order === 'price-desc') {
        testFlights.sort((a, b) => {
            return b.price - a.price;
          });
    } else if (order === 'stops-asc') {
        testFlights.sort((a, b) => {
            return a.num_stops - b.num_stops;
          });
    } else if (order === 'stops-desc') {
        testFlights.sort((a, b) => {
            return b.num_stops - a.num_stops;
          });
    }

    renderFlights(price, stops);



    
}

function renderFlights(maxPrice, maxStops) {
    
    
    flightList.innerHTML = '';

    testFlights.forEach(flight => {
        if (flight.price <= maxPrice && flight.num_stops <= maxStops) {
            const flightInfoElement = createFlightInfoElement(flight);
            flightList.appendChild(flightInfoElement);
        }
    });
}
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


renderFlights(1000, 5);

