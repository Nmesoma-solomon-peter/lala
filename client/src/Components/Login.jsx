// import React from 'react'
// // import axios from "axios"

// function Login() {
//     const signupUser = () => {
//             // Redirect the user to the backend route
//             // window.location.href = 'http://192.168.1.78:5000/auth/google';
//             window.location.href = 'http://localhost:5000/auth/google';
//     }; 
    
//     return (
//         <>
//             <button onClick={signupUser}> Signup with google</button>
//         </>
//     )
// }
// export default Login

import React from 'react';

function Login() {
    const signupUser = () => {
        // Redirect user to backend authentication route
        window.location.href = 'http://localhost:5000/auth/google';
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center max-w-sm w-full">
                <h1 className="text-2xl font-bold text-gray-700">Welcome Back</h1>
                <p className="text-gray-500 mb-4">Sign in to continue</p>
                
                <button
                    onClick={signupUser}
                    className="bg-gray-600 text-white rounded-lg px-6 py-3 w-full shadow hover:bg-gray-700 transition duration-200 font-medium"
                >
                    Sign in with Google
                </button>
            </div>
        </div>
    );
}

export default Login;
