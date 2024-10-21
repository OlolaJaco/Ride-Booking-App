import React, { useState } from 'react'
import BookingForm from './NewComponent/BookingForm'
import Map from './NewComponent/Map'
import { useDispatch, useSelector } from 'react-redux'
import { cancelBooking, setBooking } from './NewComponent/bookingSlice'
import BookingSummary from './NewComponent/BookingSummary'

const Main = () => {
    const booking = useSelector((state) => state.bookings.booking);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const handleFormSubmit = (bookingData) => {
        dispatch(setBooking(bookingData));
        setLoading(true)
    }

    const handleCancel = () => {
        dispatch(cancelBooking());
        setLoading(false)
    }

    // callback to indicate when the map has loaded
    const onMapLoad = () => {
        setLoading(false); // set loading to false when map is ready
    };

    return (
        <main>
            <div className='p-6 grid grid-cols-1 md:grid-cols-3 gap-5'>
                {!booking ? (
                <div>
                    <BookingForm onSubmit={handleFormSubmit} />
                </div>

                ) : (

                <div className='col-span-2'>
                    <BookingSummary 
                        booking={booking}
                        onCancel={handleCancel}
                        onEdit={() => console.log('Edit clicked')}
                    />

                    <Map 
                        pickupCoords={[booking.pickupLng, booking.pickupLat]}
                        destinationCoords={[booking.destLng, booking.destLat]}
                        onLoad={onMapLoad}
                    />

                    {loading && <div>Loading...</div>}
                </div>

                )}

            </div>
        </main>
    )
}

export default Main
