import React, { useState } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

function UpdateProperty(props) {
    axios.defaults.withCredentials = true
    const navigate = useNavigate()
    const postDetails = props.postDetails;

    

    const [formData, setFormData] = useState({
        title: postDetails.title,
        description: postDetails.description,
        pricePerNight: postDetails.pricePerNight,
        location: postDetails.location,
        postId: postDetails.id,
        image:postDetails.image
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('Form Data Submitted:', formData);
        axios.put('http://localhost:5000/property/updateproperty', formData)
            .then((response) => {
                console.log("Response data:", response.status);
                    //navigate to view properties
                    navigate("/dashboard/viewlistings");
            })
            .catch((error) => {
                console.error("Error:", error.response ? error.response.data : error.message);
            });
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Property</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                {/* Title Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Image</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Description Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Price per Night Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Price per Night</label>
                    <input
                        type="number"
                        name="pricePerNight"
                        value={formData.pricePerNight}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Location Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700"
                    >
                        Update Property
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateProperty;