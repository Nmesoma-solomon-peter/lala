import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

function PropertyInfoInner() {
    axios.defaults.withCredentials = true;

    const [selectedCheckin, setSelectedCheckin] = useState(null);
    const [selectedCheckout, setSelectedCheckout] = useState(null);
    const [propertyInfo, setPropertyInfo] = useState({});
    const minDate = new Date();

    // Use useSearchParams to access query parameters
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id'); // Extracting the 'id' query parameter

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/property/getspecificproperty/${id}`, {
                withCredentials: true, // Include credentials (cookies)
            })
            .then((response) => {
                setPropertyInfo(response.data.property);
            })
            .catch((error) => {
                console.error('Error:', error);
                if (error.response?.status === 401) {
                    navigate('/login');
                }
            });
    }, [id, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {"checkIn":selectedCheckin, "checkOut":selectedCheckout,"propertyId":id}
        axios.post('http://localhost:5000/property/bookproperty', formData)
            .then((response) => {
                console.log("Response data:", response.status);
                    //navigate to view properties
                    navigate("/dashboard/viewlistings");
            })
            .catch((error) => {
                console.error("Error:", error.response ? error.response.data : error.message);
                if(error.status === 401){
                    navigate("/login")
                }
            });        
    };

    return (
        <div className="container mx-auto px-48 pb-40">
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
            {/* Property Image */}
            <div className="mb-8">
                <img
                    src={propertyInfo.image}
                    alt={propertyInfo.title}
                    className="w-full h-96 object-contian  rounded-lg shadow-lg"
                />
            </div>

            {/* Two-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Property Info */}
                <div className="lg:col-span-2">
                    <h1 className="text-3xl font-bold mb-4">{propertyInfo.title}</h1>
                    <p className="text-gray-600 mb-4">{propertyInfo.location}</p>
                    <p className="text-gray-700 mb-6">{propertyInfo.description}</p>

                    {/* Property Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Price per night</p>
                            <p className="text-lg font-semibold">${propertyInfo.pricePerNight}</p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Booking Card */}
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
                    <h2 className="text-xl font-semibold mb-4">Book Your Stay</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col sm:flex-row gap-4 mb-4">
                            <div className="w-full sm:w-1/2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Check-in
                                </label>
                                <DatePicker
                                    selected={selectedCheckin}
                                    onChange={(date) => setSelectedCheckin(date)}
                                    minDate={minDate}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                                />
                            </div>
                            <div className="w-full sm:w-1/2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Check-out
                                </label>
                                <DatePicker
                                    selected={selectedCheckout}
                                    onChange={(date) => setSelectedCheckout(date)}
                                    minDate={selectedCheckin}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                                    disabled={selectedCheckin == null}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-300"
                        >
                            Book Now
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PropertyInfoInner;