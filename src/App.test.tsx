import React from 'react';
//import { render, screen } from '@testing-library/react';
import App from './App';
import FilterBar from './components/FilterBar';
import TripItem from './components/TripItem';
import TripList from './components/TripList';
//import TripList from './components/TripList';  // Adjust the import path as needed
import { TripData } from './components/TripItem';
import { render, screen, fireEvent } from '@testing-library/react';

describe('FilterBar Component', () => {
  it('renders without crashing and buttons are clickable', () => {
      render(<FilterBar handleOriginChange={() => {}} handleDestinationChange={() => {}} handleFlightsChange={() => {}} handleClassChange={() => {}} />);
      
      const filterButton = screen.getByText('Filter');
      expect(filterButton).toBeInTheDocument();
      fireEvent.click(filterButton); // Simulate click

      expect(filterButton).toBeTruthy();
  });
});

describe('TripItem Component', () => {
  it('displays basic trip information correctly', () => {
      const tripData = {
          id: 1,
          flight_type: 'One-Way',
          origin: 'New York',
          destination: 'London',
          class: 'Economy',
          price: '$500',
          flights: [],
          flight_url: 'http://example.com'
      };

      render(<TripItem tripData={tripData} onDelete={() => {}} />);
      const destinationDisplay = screen.getByText(/New York to London/);
      expect(destinationDisplay).toBeInTheDocument(); 

      const priceDisplay = screen.getByText(/\$500/);
      expect(priceDisplay).toBeInTheDocument();
  });
});

describe('TripList Component', () => {
  it('renders a list of trips with their respective destinations', () => {
    const trips = [
      { id: 1, flight_type: 'One-Way', origin: 'New York', destination: 'London', class: 'Economy', price: '$500', flights: [], flight_url: 'http://example.com' },
      { id: 2, flight_type: 'Round-Trip', origin: 'Los Angeles', destination: 'Paris', class: 'Business', price: '$1200', flights: [], flight_url: 'http://example.com' }
    ];

    render(<TripList trips={trips} onDelete={() => {}} />);


    expect(screen.getByText(/New York to London/)).toBeInTheDocument();
    expect(screen.getByText(/Los Angeles to Paris/)).toBeInTheDocument();
  });
});
// describe('TripList Component', () => {
//   it('renders a list of trips without error', () => {
//     const trips: TripData[] = [
//       {
//         id: 1,
//         flight_type: 'One-Way',
//         origin: 'New York',
//         destination: 'London',
//         class: 'Economy',
//         price: '$500',
//         flights: [
//           {
//             date: '2024-05-20',
//             origin_airport: 'JFK',
//             destination_airport: 'LHR',
//             departure_time: '10:00 AM',
//             arrival_time: '10:00 PM',
//             num_stops: 0
//           }
//         ],
//         flight_url: 'http://example.com'
//       },
//       {
//         id: 2,
//         flight_type: 'Round-Trip',
//         origin: 'San Francisco',
//         destination: 'Tokyo',
//         class: 'Business',
//         price: '$1500',
//         flights: [
//           {
//             date: '2024-05-22',
//             origin_airport: 'SFO',
//             destination_airport: 'NRT',
//             departure_time: '1:00 PM',
//             arrival_time: '6:00 PM',
//             num_stops: 1
//           }
//         ],
//         flight_url: 'http://example.com'
//       }
//     ];

//     render(<TripList trips={trips} onDelete={() => {}} />);

//     // Simply checking for any render, not validating content or interactions
//     const listItems = screen.getAllByTestId('trip-item');
//     expect(listItems.length).toEqual(trips.length);
//   });
// });