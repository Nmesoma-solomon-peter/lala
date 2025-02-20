import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ViewListings(props) {
    axios.defaults.withCredentials = true
    const navigate = useNavigate();
// converting db date to readable date
    const formattedDate = (timestamp)=>{
        const date = new Date(timestamp);

    // Format the date and time
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true, // Use 12-hour format (AM/PM)
    };

   return date.toLocaleString('en-US', options);
    }
    
    //save response status 
    const [resStatus, setResStatus] = useState()

    const [properties, setProperties] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/property/getspecificproperty', {
            withCredentials: true // Include credentials (cookies)
        }).then(response => {            
            setProperties(response.data.properties)
            setResStatus(response.status)
            console.log(response.data.properties.length);
        })
        .catch(error => {
                console.error('Error:', error);
                if(error.status === 401){
                    navigate("/login")
                }
            });
    }, [])

    // State to manage which property's action menu is open
    const [openMenuId, setOpenMenuId] = useState(null);

    // Function to toggle the action menu for a property
    const toggleMenu = (id) => {
        setOpenMenuId(openMenuId === id ? null : id);
    };

    // Function to handle delete action
    const handleDelete = (id) => {
        setProperties(properties.filter((property) => property.id !== id));
        axios.delete(`http://localhost:5000/property/deleteProperty/${id}`, {
            withCredentials: true // Include credentials (cookies)
        }).then(response => {            
            console.log(response);
            
        })
        .catch(error => {
                console.error('Error:', error);
            });

        setOpenMenuId(null); // Close the menu after deletion
    };

    // Function to handle update action
    const handleUpdate = (property) => {
        navigate("/dashboard/updateproperty")
        props.setPostDetails(property)
        setOpenMenuId(null); // Close the menu after update
    };

    return (
        (properties.length < 1) ? <div>
            <h2>You have no Property listed yet</h2>
        </div> : 
        <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Listings</h2>
            <div className="space-y-6">
                {properties.map((property) => (
                    <div
                        key={property.id}
                        className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-6"
                    >
                        {/* Property Image */}
                        <img
                            src={property.image}
                            alt={property.title}
                            className="w-24 h-24 object-cover rounded-lg"
                        />

                        {/* Property Details */}
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-800">
                                {property.title}
                            </h3>
                            <p className="text-gray-600 mt-2">{property.description}</p>
                            <div className="mt-4 flex items-center space-x-4">
                                <span className="text-lg font-bold text-gray-800">
                                    ${property.pricePerNight} <span className="text-sm text-gray-500">/ night</span>
                                </span>
                                <span className="text-sm text-gray-500">
                                    Created on: {formattedDate(property.createdAt)}
                                </span>
                            </div>
                        </div>

                        {/* 3-Dot Menu */}
                        <div className="relative">
                            <button
                                onClick={() => toggleMenu(property.id)}
                                className="p-2 hover:bg-gray-100 rounded-full focus:outline-none"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                    />
                                </svg>
                            </button>

                            {/* Action Menu Popup */}
                            {openMenuId === property.id && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                                    <ul className="py-2">
                                        <li>
                                            <button
                                                onClick={() => handleUpdate(property)}
                                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            >
                                                Update
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => handleDelete(property.id)}
                                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            >
                                                Delete
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    
    );
}

export default ViewListings;