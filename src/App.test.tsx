import FilterBar from './components/FilterBar';
import TripItem from './components/TripItem';
import TripList from './components/TripList';

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


describe('TripItem Component (Alternate)', () => {
  it('displays alternative schema of trip information correctly', () => {
    const tripData = {
      id: 2,
      flight_type: 'Round-Trip',
      origin: 'San Francisco',
      destination: 'Tokyo',
      class: 'Business',
      price: '$2000',
      flights: [],
      flight_url: 'http://alternative-example.com'
    };

    render(<TripItem tripData={tripData} onDelete={() => {}} />);

    // Ensure that the destination display is correct
    const destinationDisplay = screen.getByText(/San Francisco to Tokyo/);
    expect(destinationDisplay).toBeInTheDocument();

    // Verify the price is displayed correctly
    const priceDisplay = screen.getByText(/\$2000/);
    expect(priceDisplay).toBeInTheDocument();
  });
});

describe('TripList Component (Alternate)', () => {
  it('renders a list of trips accurately and with proper functionality', () => {
    const trips = [
      { id: 3, flight_type: 'One-Way', origin: 'Seattle', destination: 'Sydney', class: 'Economy', price: '$700', flights: [], flight_url: 'http://alternative-example.com' },
      { id: 4, flight_type: 'Round-Trip', origin: 'Chicago', destination: 'Dubai', class: 'First Class', price: '$3000', flights: [], flight_url: 'http://alternative-example.com' }
    ];

    render(<TripList trips={trips} onDelete={() => {}} />);

    // Verify the different trips are displayed correctly
    expect(screen.getByText(/Seattle to Sydney/)).toBeInTheDocument();
    expect(screen.getByText(/Chicago to Dubai/)).toBeInTheDocument();
  });
});

describe('FilterBar Component', () => {
  it('buttons are clickable after being rendered', () => {
      render(<FilterBar handleOriginChange={() => {}} handleDestinationChange={() => {}} handleFlightsChange={() => {}} handleClassChange={() => {}} />);
      
      const filterButton = screen.getByText('Filter');
      fireEvent.click(filterButton); // Simulate click again

      expect(filterButton).toBeTruthy();
  });
});