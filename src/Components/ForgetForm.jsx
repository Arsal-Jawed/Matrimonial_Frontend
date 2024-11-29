import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CONFIG from '../Configuration';

function ForgetForm() {
    const [isEmailValidated, setIsEmailValidated] = useState(false);
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const IP = CONFIG.IP || 'localhost';
    const PORT = CONFIG.PORT;

    const handleEmailSubmit = async() => {
        
        console.log("Request Called");
        const response = await fetch(`http://${IP}:${PORT}/users/forgetPassword`,{

            method: 'POST',
            body: JSON.stringify({email}),
            headers: {
                'Content-Type':'application/json'
            }
        });

        if(response.ok){
            setIsEmailValidated(true);
        }else{
            setError("Email Not Found");
            console.log("No Email");
        }
    };

    const handlePasswordUpdate = async() => {
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        
        if (newPassword.length < 8) {
            setError("Password must be at least 8 characters long");
        } else if (!specialCharRegex.test(newPassword)) {
            setError("Password must contain at least one special character");
        } else if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
        } else {
            setError("");
            
            const response = await fetch(`http://${IP}:${PORT}/users/updatePassword`,{
                method: 'POST',
                body: JSON.stringify({email,newPassword}),
                headers: {
                    'Content-Type':'application/json'
                }
            });

            if(response.ok){
                navigate('/');
            }else{

                setError("Failed to Update Password");
                return;
            }
        }
    };

    return (
        <div className="flex flex-col border border-clr1 p-[2.5vh] rounded-[1vw] mx-[4vw] w-[24vw]">
            {!isEmailValidated ? (
                <>
                    <label htmlFor="email" className="mb-2 text-[1.2vw] font-semibold text-clr2">
                        Enter your email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-2 border rounded mb-4 focus:outline-none focus:ring focus:ring-clr1"
                        placeholder="Email"
                    />
                    <button
                        onClick={handleEmailSubmit}
                        className="bg-clr1 text-white py-2 rounded hover:bg-clr2"
                    >
                        Send Request
                    </button>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </>
            ) : (
                <>
                    <label htmlFor="newPassword" className="mb-2 text-[1.2vw] font-semibold text-clr2">
                        New Password
                    </label>
                    <input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="p-2 border rounded mb-4 focus:outline-none focus:ring focus:ring-clr1"
                        placeholder="New Password"
                    />
                    <label htmlFor="confirmPassword" className="mb-2 text-[1.2vw] font-semibold text-clr2">
                        Confirm Password
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="p-2 border rounded mb-4 focus:outline-none focus:ring focus:ring-clr1"
                        placeholder="Confirm Password"
                    />
                    <button
                        onClick={handlePasswordUpdate}
                        className="bg-clr1 text-white py-2 rounded hover:bg-clr2"
                    >
                        Update Password
                    </button>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </>
            )}
        </div>
    );
}

export default ForgetForm;
