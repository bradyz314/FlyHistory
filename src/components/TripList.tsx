import TripItem, { TripData } from "./TripItem";

interface TripListProps {
    trips: TripData[],
    onDelete: (id: number) => void
}

export default function TripList({trips, onDelete} : TripListProps) {
    return (
        <div className='trip-list'>
            {trips.map((data) => (
                <>
                    <TripItem
                        tripData={data}
                        onDelete={onDelete}
                    />
                </>
            ))}
        </div>
    )
}