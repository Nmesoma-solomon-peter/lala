import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import HostDashboard from "./HostDashboard"
import RenterDashboard from './RenterDashboard'
import { useNavigate } from 'react-router-dom'

function DashboardMain() {
    Axios.defaults.withCredentials = true
    const [userRole , setUserRole] = useState("")
    const [userDetails , setUserdetails] = useState({})
    const navigate = useNavigate()
    useEffect(()=>{
        Axios.get('http://localhost:5000/users/dashboard', {
            withCredentials: true // Include credentials (cookies, auth headers)
        }).then(response => {
                // console.log('Response:', response.data);
                setUserRole(response.data.role)       
                setUserdetails(response.data)         
            })
            .catch(error => {
                console.error('Error:', error);
                if(error.status === 401){
                    navigate("/login")
                }
            });
    },[])

    return (
        <>
            {
                userRole == "Renter" ? <RenterDashboard/> : <HostDashboard details={userDetails} />
            }
        
        </>
    )
}

export default DashboardMain