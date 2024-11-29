import React from 'react';
import { FaHeart, FaStar, FaUser } from "react-icons/fa";
import { useState,useEffect } from 'react';
import CONFIG from '../Configuration';

function Featurebar({ onFilterChange }) {
  const countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria",
    "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", 
    "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", 
    "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", 
    "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", 
    "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", 
    "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", 
    "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", 
    "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", 
    "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", 
    "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", 
    "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", 
    "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", 
    "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", 
    "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", 
    "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", 
    "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", 
    "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", 
    "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", 
    "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", 
    "Zambia", "Zimbabwe"];
  const religions = ["Christianity", "Islam", "Hinduism", "Buddhism", "Sikhism", "Judaism", "Bahá'í", "Jainism", "Shinto"];
  const builds = ["Slim", "Average", "Athletic", "Heavy", "Muscular", "Chubby", "Plump"];
  const occupations = [
    "Accountant", "Actor", "Architect", "Artist", "Banker", "Business Analyst", "Chef", "Civil Engineer", "Consultant", "Content Creator",
    "Cybersecurity Specialist", "Data Analyst", "Dentist", "Designer", "Doctor", "Driver", "Electrician", "Engineer", "Entrepreneur",
    "Financial Analyst", "Firefighter", "Graphic Designer", "House Carer" ,"HR Manager", "Industrial Worker", "Journalist", "Labour", "Lawyer",
    "Marketing Manager", "Mechanic", "Musician", "Nurse", "Nutritionist", "Pharmacist", "Photographer", "Pilot", "Plumber", "Police Officer",
    "Product Manager", "Professor", "Project Manager", "Public Relations Specialist", "Real Estate Agent", "Researcher", "Sales Manager",
    "Scientist", "Social Worker", "Software Engineer", "Software Tester", "Student", "Teacher", "Therapist", "Translator", "Veterinarian",
    "Video Editor", "Web Developer"
  ];

  const [cities, setCities] = useState([]);

  const IP = CONFIG.IP || 'localhost';
  const PORT = CONFIG.PORT;

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  const handleShowAllProfiles = () => {
    onFilterChange("country", "");
    onFilterChange("religion", "");
    onFilterChange("build", "");
    onFilterChange("occupation", "");
    onFilterChange("city", "");
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(`http://${IP}:${PORT}/users/getCities`);
        if (!response.ok) throw new Error("Failed to fetch cities");
        const data = await response.json();
        setCities(data);
        console.log(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchCities();
  }, []);

  return (
    <div className="relative bg-[#b1b1b1] flex flex-row items-center justify-center p-[2.2vh] w-[100vw] overflow-hidden">
      
      <div className="absolute inset-0 z-0 opacity-20">
        <FaHeart className="text-[#f7f7f7] animate-move_icon absolute text-[4vw] top-1 left-10" />
        <FaStar className="text-[#f7f7f7] animate-move_icon absolute text-[4vw] top-1 right-40" />
        <FaStar className="text-[#f7f7f7] animate-move_icon absolute text-[4vw] top-1 left-40" />
        <FaHeart className="text-[#f7f7f7] animate-move_icon absolute text-[4vw] top-1 right-10" />
      </div>

      <div className="relative z-10 flex flex-row items-center">
        <p
          className="text-clr2 bg-gradient-to-r from-white to-gray-200 py-[0.8vh] px-[1.1vw] rounded-[0.6vw] text-[0.9vw] italic hover:bg-gradient-to-r hover:from-gray-200 hover:to-white font-semibold mr-4 cursor-pointer shadow-lg transition-all duration-300 transform hover:scale-105"
          onClick={handleShowAllProfiles}
        >
          Show All Profiles
        </p>

        <select
          name="country"
          onChange={handleFilterChange}
          className="text-clr2 bg-gradient-to-r from-white to-gray-200 p-[0.8vh] rounded-[0.6vw] text-[0.9vw] italic hover:bg-gradient-to-r hover:from-gray-200 hover:to-white font-semibold mr-4 focus:outline-none shadow-md transition-all duration-300 transform hover:scale-105"
        >
          <option value="">Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <select
          name="city"
          onChange={handleFilterChange}
          className="text-clr2 bg-gradient-to-r from-white to-gray-200 p-[0.8vh] rounded-[0.6vw] text-[0.9vw] italic hover:bg-gradient-to-r hover:from-gray-200 hover:to-white font-semibold mr-4 focus:outline-none shadow-md transition-all duration-300 transform hover:scale-105"
        >
          <option value="">City</option>
          {cities.map((city, index) => (
            <option key={index} value={city.city}>
              {city.city}
            </option>
          ))}
        </select>

        <select
          name="religion"
          onChange={handleFilterChange}
          className="text-clr2 bg-gradient-to-r from-white to-gray-200 p-[0.8vh] rounded-[0.6vw] text-[0.9vw] italic hover:bg-gradient-to-r hover:from-gray-200 hover:to-white font-semibold mr-4 focus:outline-none shadow-md transition-all duration-300 transform hover:scale-105"
        >
          <option value="">Religion</option>
          {religions.map((religion) => (
            <option key={religion} value={religion}>
              {religion}
            </option>
          ))}
        </select>

        <select
          name="build"
          onChange={handleFilterChange}
          className="text-clr2 bg-gradient-to-r from-white to-gray-200 p-[0.8vh] rounded-[0.6vw] text-[0.9vw] italic hover:bg-gradient-to-r hover:from-gray-200 hover:to-white font-semibold mr-4 focus:outline-none shadow-md transition-all duration-300 transform hover:scale-105"
        >
          <option value="">Build</option>
          {builds.map((build) => (
            <option key={build} value={build}>
              {build}
            </option>
          ))}
        </select>

        <select
          name="occupation"
          onChange={handleFilterChange}
          className="text-clr2 bg-gradient-to-r from-white to-gray-200 p-[0.8vh] rounded-[0.6vw] text-[0.9vw] italic hover:bg-gradient-to-r hover:from-gray-200 hover:to-white font-semibold focus:outline-none shadow-md transition-all duration-300 transform hover:scale-105"
        >
          <option value="">Occupation</option>
          {occupations.map((occupation) => (
            <option key={occupation} value={occupation}>
              {occupation}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Featurebar;