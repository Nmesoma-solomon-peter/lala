import { Routes, Route } from "react-router-dom";
import React from 'react'
import Login from './Components/Login'
import DashboardMain from "./Components/DashboardMain";
import AddNewProperty from "./Components/AddNewProperty";
import ViewListings from "./Components/ViewListings";


function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<DashboardMain />}/>
        {/* <Route path="/addproperty" element={<AddNewProperty/>}/>
        <Route path="/viewlistings" element={<ViewListings/>}/> */}
      </Routes>
    </>
  )
}

export default App