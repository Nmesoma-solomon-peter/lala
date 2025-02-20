import React from 'react';
import { Link } from 'react-router-dom';

function HostSidebar() {
    return (
        <div>
            <aside className="w-80 bg-gray-800 text-white p-6 h-screen"> {/* Increased width and padding */}
                <nav>
                    <ul className="space-y-6"> {/* Increased spacing between links */}
                        <li>
                            <Link to="/dashboard/overview" className="block py-3 px-6 hover:bg-gray-700 rounded-md text-lg"> {/* Increased font size and padding */}
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <a href="/dashboard/addproperty" className="block py-3 px-6 hover:bg-gray-700 rounded-md text-lg">
                                Add Property
                            </a>
                        </li>
                        <li>
                            <Link to="/dashboard/viewlistings" className="block py-3 px-6 hover:bg-gray-700 rounded-md text-lg">
                                View Listings
                            </Link>
                        </li>
                        <li>
                            <a href="/dashboard/bookings" className="block py-3 px-6 hover:bg-gray-700 rounded-md text-lg">
                                Bookings
                            </a>
                        </li>
                        <li>
                            <a href="/dashboard/financials" className="block py-3 px-6 hover:bg-gray-700 rounded-md text-lg">
                                Financials
                            </a>
                        </li>
                        <li>
                            <a href="/dashboard/reviews" className="block py-3 px-6 hover:bg-gray-700 rounded-md text-lg">
                                Reviews
                            </a>
                        </li>
                        <li>
                            <a href="/settings" className="block py-3 px-6 hover:bg-gray-700 rounded-md text-lg">
                                Settings
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>
        </div>
    );
}

export default HostSidebar;