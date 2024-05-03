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
    price: string,
    flights: FlightData[],
    flight_url: string
}

export interface TripItemProps {
    tripData: TripData,
    onDelete: (id: number) => void
} 

export default function TripItem({tripData, onDelete}: TripItemProps) {
    console.log(tripData);
    return (
        <div className='trip-info'>
            <h3 className='trip-type'>{tripData.flight_type === 'Multi-City Trip' ? tripData.flight_type : `${tripData.origin} to ${tripData.destination}`}</h3>
            <p className='trip-cost'>{`Cost: ${tripData.price}`}</p>
            {tripData.flights.map((data, idx) => (
                <div className='flight-info' key={idx}>
                    <h5 className='flight-no'>{idx}</h5>
                    <p className='flight-date'>{`Data: ${data.date}`}</p>
                    <p className='flight-airport'>{`Origin: ${data.origin_airport}`}</p>
                    <p className='flight-departure'>{`Depart Time: ${data.departure_time}`}</p>
                    <p className='flight-airport'>{`Destination: ${data.destination_airport}`}</p>
                    <p className='flight-arrival'>{`Arrival Time: ${data.arrival_time}`}</p>
                    <p className='flight-no-of-stops'>{`Stops: data.num_stops`}</p>
                </div>
            ))}
            <a href={tripData.flight_url} className='trip-link'>Click here for more.</a>
            <button className='trip-delete' onClick={() => onDelete(tripData.id)}>Remove</button>
        </div>
    );
}