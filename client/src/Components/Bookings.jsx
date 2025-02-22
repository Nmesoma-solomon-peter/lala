import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

function Bookings() {
    // Sample data for booked properties
    axios.defaults.withCredentials = true
    const [bookings,setBookings] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/property/allbookings', {
            withCredentials: true // Include credentials (cookies)
        }).then(response => {            
            // setProperties(response.data.properties)
            // setResStatus(response.status)
            setBookings(response.data.bookings);
            console.log(response.data.bookings);
            
        })
        .catch(error => {
                console.error('Error:', error);
                if(error.status === 401){
                    navigate("/login")
                }
            });
    }, [])

   

    // Function to determine status color
    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved':
                return 'bg-green-100 text-green-800';
            case 'Pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'Cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* back to home */}
            <div className="mb-10">
                <Link
                    to="/"
                    className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-300"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Back to home
                </Link>
            </div>
            <div className="max-w-10/12 mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Bookings</h1>

                <div className="space-y-6">
                    {bookings.map((booking) => (
                        <div
                            key={booking.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="flex flex-col md:flex-row">
                                {/* Property Image */}
                                <div className="md:w-1/3">
                                    <img
                                        src={booking.property.image}
                                        alt={booking.property.title}
                                        className="w-full h-48 object-cover"
                                    />
                                </div>

                                {/* Property Details */}
                                <div className="md:w-2/3 p-6 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <h2 className="text-xl font-semibold text-gray-800">
                                                {booking.property.title}
                                            </h2>
                                            {/* Status Badge */}
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                                    booking.status
                                                )}`}
                                            >
                                                {booking.status}
                                            </span>
                                        </div>
                                        <p className="text-gray-600">{booking.property.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Bookings;