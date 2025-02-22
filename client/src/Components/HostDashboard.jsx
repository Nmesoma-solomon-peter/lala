import { Routes, Route } from 'react-router-dom'
import HostDashboardHeader from './HostDashboardHeader'
import HostOverview from './HostOverview'
import HostSidebar from './HostSidebar'
import AddNewProperty from './AddNewProperty'
import HostDashInner from './HostDashInner'
import ViewListings from './ViewListings'
import UpdateProperty from './updateProperty'
import HostPropBooked from './HostPropBooked'
import { useState } from 'react'

function HostDashboard(props) {

    const [postDetails, setPostDetails] = useState({})

    return (
        <>
            <div className="min-h-screen bg-gray-100">
                {/* Header */}
                <HostDashboardHeader profilePix={props.details.profile_pix} />

                <div className="flex">
                    {/* Sidebar */}
                    <HostSidebar />

                    {/* Main Content */}
                    <div className="flex-1 p-6">
                        <Routes>
                            {/* Dashboard Route with Nested Routes */}
                            <Route path="/" element={<HostDashInner />}>
                                <Route path="overview" element={<HostOverview />} />
                                <Route path="addproperty" element={<AddNewProperty />} />
                                <Route path="viewlistings" element={<ViewListings setPostDetails={setPostDetails}/>} />
                                <Route path="updateproperty" element={<UpdateProperty postDetails={postDetails}/>} />
                                <Route path="hostpropertiesbooked" element={<HostPropBooked/>} />
                            </Route>
                        </Routes>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default HostDashboard