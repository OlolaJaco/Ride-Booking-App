
const BookingSummary = ({ booking, onEdit, onCancel }) => {
    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Booking Summary</h2>
            <p>Pickup: {booking.pickup}</p>
            <p>Destination: {booking.destination}</p>
            <p>Date: {booking.date}</p>
            <p>Time: {booking.time}</p>

            <button onClick={onEdit} className="bg-yellow-500 text-white p-2 rounded">Edit</button>
            <button onClick={onCancel} className="bg-red-500 text-white p-2 rounded ml-2">Edit</button>
        </div>
    )
}

export default BookingSummary
