import { Box, Button } from '@mui/material';

export interface FlightData {
    date: string,
    origin_airport: string,
    destination_airport: string,
    departure_time: string,
    arrival_time: string,
    num_stops: number
};

export interface TripData {
    id: number,
    flight_type: string,
    origin: string,
    destination: string,
    class: string,
    price: string,
    flights: FlightData[],
    flight_url: string
}

export interface TripItemProps {
    tripData: TripData,
    onDelete: (id: number) => void
} 

export default function TripItem({tripData, onDelete}: TripItemProps) {
    return (
        <div className='trip-info' style={{border: '3px solid #4387cc', borderRadius: '5px', margin: '5px 0px', padding: '5px'}}>
             <h2 className='trip type'>{tripData.flight_type === 'Multi-City Trip' ? tripData.flight_type : `${tripData.origin} to ${tripData.destination}`}</h2>
             <h4 className='trip cost'>{`Cost: ${tripData.price}`}</h4>
             <h4 className='trip class'>{`Class: ${tripData.class}`}</h4>
             {tripData.flights.map((data, idx) => (
                <div className='flight-info' key={idx}>
                    <h3 className='flight-no'>{`Flight #${idx + 1}`}</h3>
                    <p className='flight-date'>{`Data: ${data.date}`}</p>
                    <p className='flight-airport'>{`Origin: ${data.origin_airport}`}</p>
                    <p className='flight-departure'>{`Depart Time: ${data.departure_time}`}</p>
                    <p className='flight-airport'>{`Destination: ${data.destination_airport}`}</p>
                    <p className='flight-arrival'>{`Arrival Time: ${data.arrival_time}`}</p>
                    <p className='flight-no-of-stops'>{`Stops: ${data.num_stops}`}</p>
                </div>
            ))}
             <Box textAlign='center'>
                <Button 
                    variant="contained"
                    onClick={() => {
                        chrome.tabs.create({url: tripData.flight_url});
                    }}
                    className="trip link-btn"
                    color="success"
                >
                    Redirect
                </Button>
                <Button 
                    variant="contained"
                    onClick={() => onDelete(tripData.id)}
                    className="trip filter-btn"
                    color="error"
                >
                    Remove
                </Button>
             </Box>
        </div>
    );
}