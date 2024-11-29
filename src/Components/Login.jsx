import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CONFIG from '../Configuration';

function Login({onClose}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    const IP = CONFIG.IP || 'localhost';
    const PORT = CONFIG.PORT;

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async(e) => {
        e.preventDefault();

        const response = await fetch(`http://${IP}:${PORT}/users/login`,{
            method: 'POST',
            body: JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        });

        if(response.ok){
            localStorage.clear();
            const data = await response.json();
            localStorage.setItem("user",JSON.stringify(data));
            onClose();
            await fetch(`http://${IP}:${PORT}/users/online`,{
                method: 'POST',
                body: JSON.stringify({email}),
                headers:{'Content-Type':'application/json'}
              });
            navigate('/main');
        }else{

            console.log("Failed to Login");
            setError("invalid username or password");
        }
        
    };

    return (
        <div className="fixed inset-0 flex md:items-center items-start md:pt-[0vh] pt-[10vh] justify-center z-50 bg-black bg-opacity-50">
            <div className="flex flex-col justify-center items-center shadow-xl bg-white rounded-[1vw] p-[5vw] w-[70vw] md:p-[2vw] md:w-[25vw]">
                <h2 className="text-[5vw] md:text-[2vw] mb-[5vw] md:mb-[1.5vw] font-semibold">Login</h2>
                <form onSubmit={handleLogin} className="w-full">
                    <div className="mb-[6vw] md:mb-[1vw]">
                        <label htmlFor="email" className="block text-sm font-medium text-clr2 mb-[1.5vw] md:mb-[0.5vw]">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter Your Email"
                            value={email}
                            onChange={handleEmailChange}
                            className="w-full border border-gray-300 rounded-[0.5vw] p-[0.75vw] focus:outline-none focus:border-blue-400 shadow-sm"
                            required
                        />
                    </div>
                    <div className="mb-[6vw] md:mb-[1.5vw]">
                        <label htmlFor="password" className="block text-sm font-medium text-clr2 mb-[1.5vw] md:mb-[0.5vw]">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter Your Password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="w-full border border-gray-300 rounded-[0.5vw] p-[0.75vw] focus:outline-none  focus:border-blue-400 shadow-sm"
                            required
                        />
                        <div className="text-right mt-[0.5vw]">
                            <a href="/forget" className="text-sm text-blue-500 hover:text-blue-700">
                                Forgot Password?
                            </a>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-clr2 text-white py-[0.75vw] rounded-[0.5vw] hover:bg-clr1 transition-all duration-300"
                    >
                        Login
                    </button>
                    <p className="text-[1vw] text-red-500">{error}</p>
                </form>
                <div className="mt-[6vw] md:mt-[1.5vw] text-sm">
                    Not a User?{" "}
                    <a href="/signup" className="text-blue-500 hover:text-blue-700">
                        Sign Up
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Login;
