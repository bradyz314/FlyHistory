import './App.css';
import { useState, useEffect } from 'react';
import { TripData } from './components/TripItem';
import TripList from './components/TripList';


function App() {
  const [trips, setTrips] = useState<TripData[]>([]);
  // UseEffect to load trips from local storage
  // Use useEffect to load snippets from local storage when the component mounts
  useEffect(() => {
    chrome.storage.local.get({'flights': []}, (result) => {
      setTrips(result.flights);
    });
  }, []);
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
      <h1> FlyHistory </h1>
      <TripList trips={trips} onDelete={handleDelete}/>
    </div>
  );
}

export default App;