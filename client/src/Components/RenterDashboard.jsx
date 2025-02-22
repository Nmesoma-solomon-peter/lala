import React from 'react'
import RenterDashboardHeader from './RenterDashboardHeader'
import HouseCard from './HousecCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function RenterDashboard() {
  const [listings, setListings] = useState([])
  const [noProperty, setNoProperty] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:5000/property/getallproperty', {
      withCredentials: true // Include credentials (cookies)
    }).then(response => {
      setListings(response.data.properties)
      // setResStatus(response.status)
      console.log(response.data.properties);
    })
      .catch(error => {
        console.error('Error:', error);
        if (error.status === 404) {
          setNoProperty(true)
        }
      });
  }, [])

  return (
    <>
      <RenterDashboardHeader />
      {noProperty === false && <div className="p-6 px-12 mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {listings.map((listing, index) => (
          <Link to={`/property?id=${listing.id}`}>
            <HouseCard
              key={index}
              image={listing.image}
              title={listing.title}
              description={listing.description}
              pricePerNight={listing.pricePerNight}
            />
          </Link>

        ))}
      </div>}
      {noProperty === true && <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center p-6">
        <p className="text-2xl font-semibold text-gray-700 mb-4">
          No property found yet,
        </p>
        <p className="text-lg text-gray-500">
          Hold on, the hosts might post a property soon.
        </p>
      </div>}

    </>
  )
}

export default RenterDashboard