const flightList = document.getElementById('flight-list');



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
        emissions: '-29%'
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
        emissions: '-29%'
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
        emissions: '-29%',
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

    const priceEmissionsContainer = document.createElement('div');
    priceEmissionsContainer.classList.add('price-emissions-container');



    const priceDiv = document.createElement('div');
    priceDiv.classList.add('price');
    priceDiv.textContent = `$${flight.price}`;

    const emissionsDiv = document.createElement('div');
    emissionsDiv.classList.add('emissions');
    emissionsDiv.textContent = `${flight.emissions} emissions`;

    priceEmissionsContainer.appendChild(priceDiv);
    priceEmissionsContainer.appendChild(emissionsDiv);

    flightInfoElement.appendChild(detailsDiv);
    flightInfoElement.appendChild(priceEmissionsContainer);

    return flightInfoElement;
}

function renderFlights(maxPrice) {

    flightList.innerHTML = '';

    testFlights.forEach(flight => {
        const flightInfoElement = createFlightInfoElement(flight);
        flightList.appendChild(flightInfoElement);
        
    });
}

function renderFlightsByPrice(maxPrice) {

    flightList.innerHTML = '';
    testFlights.forEach(flight => {
        if (flight.price <= maxPrice) {
            const flightInfoElement = createFlightInfoElement(flight);
            flightList.appendChild(flightInfoElement);
        }
    });
}

renderFlights();