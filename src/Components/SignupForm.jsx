import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CONFIG from '../Configuration';

function SignupForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const IP = CONFIG.IP || 'localhost';
  const PORT = CONFIG.PORT;

  const handleUsername = (e) => setUsername(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);
  const handleGender = (e) => setGender(e.target.value);

  function validateForm() {
    const newErrors = { username: '', email: '', password: '', confirmPassword: '' };

    if (username.trim() === '') newErrors.username = 'Please enter your username';
    if (email.trim() === '') newErrors.email = 'Please enter your email';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Please enter a valid email address';
    if (password.trim() === '') newErrors.password = 'Please enter your password';
    else if (password.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) newErrors.password = 'Password must be at least 8 characters long and contain one special character';
    if (confirmPassword.trim() === '') newErrors.confirmPassword = 'Please confirm your password';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === '');
  }

  const SignUp = async(e) => {
    e.preventDefault();
    if (validateForm()) {

      const User = {username,email,password,gender}
      // console.log(User);
      const response = await fetch(`http://${IP}:${PORT}/users/createUser`,{
        method: 'POST',
        body: JSON.stringify(User),
        headers:{
          'Content-Type':'application/json'
        }
      });

      if (response.ok) {
        localStorage.clear();
        localStorage.setItem("RegisteredUser", JSON.stringify(User));
        await fetch(`http://${IP}:${PORT}/users/saveState`,{
          method: 'POST',
          body: JSON.stringify({email}),
          headers:{'Content-Type':'application/json'}
        });
        navigate('/makeprofile');
    } else {
        const errorMessage = await response.text();
        console.log("Failed to Create User: ", errorMessage);
        alert("Failed to create user: " + errorMessage);
    }
    
      
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-2xl p-8 md:w-[40vw] w-[90vw]">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign Up</h2>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-clr2 mb-2" htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter Your Username"
                className={`w-full p-3 rounded-lg bg-transparent border ${errors.username ? 'border-red-500' : 'border-gray-300'} text-gray-700 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-sm ${errors.username ? 'focus:shadow-red-500' : 'focus:shadow-blue-400'}`}
                value={username}
                onChange={handleUsername}
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
            </div>
            <div className="flex flex-col">
              <label className="text-clr2 mb-2" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter Your Email"
                className={`w-full p-3 rounded-lg bg-transparent border ${errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-700 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-sm ${errors.email ? 'focus:shadow-red-500' : 'focus:shadow-blue-400'}`}
                value={email}
                onChange={handleEmail}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div className="flex flex-col">
              <label className="text-clr2 mb-2" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter Your Password"
                className={`w-full p-3 rounded-lg bg-transparent border ${errors.password ? 'border-red-500' : 'border-gray-300'} text-gray-700 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-sm ${errors.password ? 'focus:shadow-red-500' : 'focus:shadow-blue-400'}`}
                value={password}
                onChange={handlePassword}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            <div className="flex flex-col">
              <label className="text-clr2 mb-2" htmlFor="confirm-password">Confirm Password</label>
              <input
                id="confirm-password"
                type="password"
                placeholder="Confirm Your Password"
                className={`w-full p-3 rounded-lg bg-transparent border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} text-gray-700 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-sm ${errors.confirmPassword ? 'focus:shadow-red-500' : 'focus:shadow-blue-400'}`}
                value={confirmPassword}
                onChange={handleConfirmPassword}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>
          <div className="mt-4">
            <div className="flex flex-col gap-4 mb-6">
              <label className="text-clr2">Gender</label>
              <div className="flex gap-4">
                <label className="flex items-center text-gray-700">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    className="mr-2"
                    onChange={handleGender}
                  />
                  Male
                </label>
                <label className="flex items-center text-gray-700">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    className="mr-2"
                    onChange={handleGender}
                  />
                  Female
                </label>
              </div>
            </div>
            <button
              className="bg-clr2 text-white font-bold py-3 w-full rounded-lg hover:bg-clr1 transition duration-300"
              onClick={SignUp}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
