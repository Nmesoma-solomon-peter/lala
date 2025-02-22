import React from 'react'
// import axios from "axios"

function Login() {
    const signupUser = () => {
            // Redirect the user to the backend route
            // window.location.href = 'http://192.168.1.78:5000/auth/google';
            window.location.href = 'http://localhost:5000/auth/google';
    }; 
    
    return (
        <>
            <button onClick={signupUser}> Signup with google</button>
        </>
    )
}
export default Login