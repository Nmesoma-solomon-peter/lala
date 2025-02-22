import { Routes, Route } from "react-router-dom";
import React from 'react'
import Login from './Components/Login'
import DashboardMain from "./Components/DashboardMain";
import AddNewProperty from "./Components/AddNewProperty";
import ViewListings from "./Components/ViewListings";
import RenterDashboard from "./Components/RenterDashboard";
import PropertyInner from "./Components/PropertyInner"
import Bookings from "./Components/Bookings";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RenterDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<DashboardMain />}/>
        <Route path='/property' element={<PropertyInner/>} />
        <Route path='/bookings' element={<Bookings/>} />
        {/* <Route path="/addproperty" element={<AddNewProperty/>}/>
        <Route path="/viewlistings" element={<ViewListings/>}/> */}
      </Routes>
    </>
  )
}

export default App