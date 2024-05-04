import './App.css';
import { useState, useEffect } from 'react';
import { TripData } from './components/TripItem';
import TripList from './components/TripList';
import FilterBar from './components/FilterBar';


function App() {
  const [trips, setTrips] = useState<TripData[]>([]);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [flights, setFlights] = useState(-1);
  const [flightClass, setFlightClass] = useState('Any');
  // UseEffect to load trips from local storage
  // Use useEffect to load snippets from local storage when the component mounts
  useEffect(() => {
    chrome.storage.local.get({'flights': []}, (result) => {
      let trips = result.flights;
      // Filter by origin if necessary
      if (origin.length > 0) {
        trips = trips.filter((flight: TripData) => flight.origin === origin);
      }
      // Filter by destination if necessary
      if (destination.length > 0) {
        trips = trips.filter((flight: TripData) => flight.destination === destination);
      }
      // Filter by number of flights if necessary
      if (flights !== -1) {
        trips = trips.filter((flight: TripData) => flight.flights.length === flights);
      }
      // Filter by flight class if necessary
      if (flightClass !== 'Any') {
        trips = trips.filter((flight: TripData) => flight.class === flightClass);
      }
      setTrips(trips);
    });
  }, [destination, origin, flights, flightClass]);
    // Handler for deleting a trip from the list
    const handleDelete = (id: number) => {
    // Create a new array without the deleted trip
    const filtered = trips.filter((trip) => trip.id !== id);
    // Update the state with the new array
    setTrips(filtered);
    // Save the updated trips to local storage
    chrome.storage.local.set({ flights: filtered });
  };

  return (
    <div>
      <h1 className='header'> FlyHistory </h1>
      <FilterBar handleOriginChange={setOrigin} handleDestinationChange={setDestination} handleFlightsChange={setFlights} handleClassChange={setFlightClass}/>
      <TripList trips={trips} onDelete={handleDelete}/>
    </div>
  );
}

export default App;