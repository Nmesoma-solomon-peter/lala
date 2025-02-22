import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation

function HostPropBooked() {
  axios.defaults.withCredentials = true;

  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  // Fetch booked properties from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/property/allbooked", {
        withCredentials: true, // Include credentials (cookies)
      })
      .then((response) => {
        console.log(response.data.bookings);
        setBookings(response.data.bookings);
      })
      .catch((error) => {
        console.error("Error:", error);
        if (error.response?.status === 401) {
          navigate("/login"); // Redirect to login if unauthorized
        }
      });
  }, [navigate]);

  // Handle Approve/Decline button clicks
  const handleButtonClick = async (id, status) => {
    try {
      const formData = { bookingId: id, status };
      console.log("Sending request with:", formData);

      // Make the API call to update the booking status
      const response = await axios.put(
        "http://localhost:5000/property/updatebooking",
        formData,
        { withCredentials: true }
      );

      console.log("Response data:", response.data);
      if(response.status === 200 ){
        alert("successfully Updated!")
      }

      // Update the local state to reflect the new status
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === id ? { ...booking, status } : booking
        )
      );
    } catch (error) {
      console.error("Error updating booking status:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Booked Properties</h1>
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
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {booking.property.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {booking.property.description}
                  </p>
                  <div className="text-gray-700">
                    <p>
                      <span className="font-semibold">Check-In:</span>{" "}
                      {new Date(booking.checkInDate).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-semibold">Check-Out:</span>{" "}
                      {new Date(booking.checkOutDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={() => handleButtonClick(booking.id, "Confirmed")}
                    disabled={booking.status === "Confirmed"}
                    className={`px-4 py-2 rounded-lg font-semibold ${
                      booking.status === "Confirmed"
                        ? "bg-green-500 text-white cursor-not-allowed"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    {booking.status === "Confirmed" ? "Approved" : "Approve"}
                  </button>
                  <button
                    onClick={() => handleButtonClick(booking.id, "Canceled")}
                    disabled={booking.status === "Canceled"}
                    className={`px-4 py-2 rounded-lg font-semibold ${
                      booking.status === "Canceled"
                        ? "bg-red-500 text-white cursor-not-allowed"
                        : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                  >
                    {booking.status === "Canceled" ? "Declined" : "Decline"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HostPropBooked;