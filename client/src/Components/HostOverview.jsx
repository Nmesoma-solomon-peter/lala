import React from 'react'
// import { Outlet } from 'react-router-dom'
import axios from 'axios';
import { useState,useEffect } from 'react';

function HostOverview() {
    // const [properties, setProperties] = useState([]);
    const [listingLength, setListingLength] = useState(0)
    useEffect(() => {
        axios.get('http://localhost:5000/property/getspecificproperty', {
            withCredentials: true // Include credentials (cookies)
        }).then(response => {
            // setProperties(response.data.properties)
            // setResStatus(response.status)
            setListingLength(response.data.properties.length);

        })
            .catch(error => {
                console.error('Error:', error);
                if(error.status === 401){
                    navigate("/login")
                }
            });
    }, [])

    return (
        <>
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-700">Total Listings</h3>
                        <p className="text-2xl font-bold text-gray-900">{listingLength}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-700">Upcoming Bookings</h3>
                        <p className="text-2xl font-bold text-gray-900">Unavaliable</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-700">Total Earnings</h3>
                        <p className="text-2xl font-bold text-gray-900">Unavaliable</p>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
                    <ul className="space-y-3">
                        <li className="text-gray-700">New Booking: Property A</li>
                        <li className="text-gray-700">Guest Message: "Check-in time?"</li>
                        <li className="text-gray-700">New Review: 5 Stars</li>
                    </ul>
                </div>

                {/* Outlet for Nested Routes
                <Outlet /> */}
            </div>
        </>
    )
}

export default HostOverview