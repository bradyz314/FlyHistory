import TripItem, { TripData } from "./TripItem";

interface TripListProps {
    trips: TripData[],
    onDelete: (id: number) => void
}

export default function TripList({trips, onDelete} : TripListProps) {
    return (
        <>
            {trips.length > 0 ? (
                <div>
                    {trips.map((data) => (
                        <TripItem
                            tripData={data}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            ) : (
                <p>
                    You don't have any saved flights! Go to Google Flights and begin your search.
                </p>
            )}
        </>
    )
}