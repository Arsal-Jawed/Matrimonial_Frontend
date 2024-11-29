import { useState, useEffect } from "react";
import CONFIG from '../Configuration';

function UpdateProfileForm() {
    const [profileData, setProfileData] = useState({
        email: "",
        country: "",
        city: "",
        religion: "",
        maritalStatus: "",
        occupation: "",
        education: "",
        build: "",
        children: "",
        smoking: "",
        drinking: "",
        description: ""
    });

    const [showPopup, setShowPopup] = useState(false);
    
    const StoredData = localStorage.getItem("user");
    const user = JSON.parse(StoredData);
    const email = user.email;

    const IP = CONFIG.IP || 'localhost';
    const PORT = CONFIG.PORT;

    const FetchInfo = async () => {
        try {
            const response = await fetch(`http://${IP}:${PORT}/users/getProfileByEmail?email=${email}`);
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            const data = await response.json();
            console.log("Fetched data:", data);
            setProfileData(prevData => ({
            email: user.email,
            country: data.profile.country,
            city: data.profile.city,
            religion: data.profile.religion,
            maritalStatus: data.profile.maritalStatus,
            occupation: data.profile.occupation,
            education: data.profile.education,
            build: data.profile.build,
            children: data.profile.children,
            smoking: data.profile.smoking,
            drinking: data.profile.drinking,
            description: data.profile.description
            }));
        } catch (err) {
            console.error("Error fetching profile data:", err);
        }
    };

    useEffect(() => {
        
        FetchInfo();
    },[]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });

    };

    const updateProfile = () => {
        const formData = new FormData();
        for (const key in profileData) {
            formData.append(key, profileData[key]);
        }

        fetch(`http://${IP}:${PORT}/users/updateProfile`, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                setShowPopup(true);
                setTimeout(() => setShowPopup(false), 3000);
            }
            return response.json();
        })
        .then(data => console.log("Profile updated successfully:", data))
        .catch(err => console.log("Error updating profile:", err));
    };
    const countries = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria",
        "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", 
        "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", 
        "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", 
        "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", 
        "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", 
        "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", 
        "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", 
        "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Italy", 
        "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", 
        "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", 
        "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", 
        "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", 
        "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", 
        "Oman", "Pakistan", "Palau", "Palestine" ,"Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", 
        "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", 
        "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", 
        "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", 
        "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", 
        "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", 
        "Zambia", "Zimbabwe"
      ];
      const religions = ["Christianity", "Islam", "Hinduism", "Buddhism", "Sikhism", "Judaism", "Bahá'í", "Jainism", "Shinto"];
    const maritalStatuses = ["Single", "Married", "Divorced", "Widowed"];
    const occupations = [
        "Accountant", "Actor", "Architect", "Artist", "Banker", "Business Analyst", "Chef", "Civil Engineer", "Consultant", "Content Creator",
        "Cybersecurity Specialist", "Data Analyst", "Dentist", "Designer", "Doctor", "Driver", "Electrician", "Engineer", "Entrepreneur", 
        "Financial Analyst", "Firefighter", "Graphic Designer", "HR Manager", "Industrial Worker", "Journalist", "Labour", "Lawyer", 
        "Marketing Manager", "Mechanic", "Military" ,"Musician", "Nurse", "Nutritionist", "Pharmacist", "Photographer", "Pilot", "Plumber", "Police Officer",
        "Product Manager", "Professor", "Project Manager", "Public Relations Specialist", "Real Estate Agent", "Researcher", "Sales Manager", 
        "Scientist", "Social Worker", "Software Engineer", "Software Tester", "Student", "Teacher", "Therapist", "Translator", "Veterinarian", 
        "Video Editor", "Web Developer"
      ];
    const yesNoOptions = ["Yes", "No"];

    return (
        <div className="flex flex-col items-center z-50 bg-gradient-to-r from-clr1 to-clr2 shadow-2xl rounded-lg p-8 w-[92%] max-w-3xl mx-auto mt-5 text-white">
            <h2 className="text-2xl font-bold mb-6">Update Your Profile</h2>
            
            <form className="flex flex-col w-full justify-center">
                <div className="flex flex-row justify-around gap-4">
                    <div className="flex flex-col gap-4 w-[48%]">
                        <label className="flex flex-col">
                            <span>Country</span>
                            <select 
                                name="country" 
                                value={profileData.country} 
                                onChange={handleChange} 
                                className="p-2 rounded-md shadow-inner text-gray-800 w-full"
                            >
                                <option value="">Select Country</option>
                                {countries.map((country, index) => (
                                    <option key={index} value={country}>{country}</option>
                                ))}
                            </select>
                        </label>

                        <label className="flex flex-col">
                            <span>Religion</span>
                            <select 
                                name="religion" 
                                value={profileData.religion} 
                                onChange={handleChange} 
                                className="p-2 rounded-md shadow-inner text-gray-800 w-full"
                            >
                                <option value="">Select Religion</option>
                                {religions.map((religion, index) => (
                                    <option key={index} value={religion}>{religion}</option>
                                ))}
                            </select>
                        </label>

                        <label className="flex flex-col">
                            <span>Marital Status</span>
                            <select 
                                name="maritalStatus" 
                                value={profileData.maritalStatus} 
                                onChange={handleChange} 
                                className="p-2 rounded-md shadow-inner text-gray-800 w-full"
                            >
                                <option value="">Select Status</option>
                                {maritalStatuses.map((status, index) => (
                                    <option key={index} value={status}>{status}</option>
                                ))}
                            </select>
                        </label>

                        <label className="flex flex-col">
                            <span>Smoking</span>
                            <select 
                                name="smoking" 
                                value={profileData.smoking} 
                                onChange={handleChange} 
                                className="p-2 rounded-md shadow-inner text-gray-800 w-full"
                            >
                                <option value="">Do you smoke?</option>
                                {yesNoOptions.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </label>

                        <label className="flex flex-col">
                            <span>Description</span>
                            <textarea 
                                name="description" 
                                value={profileData.description} 
                                onChange={handleChange} 
                                className="p-2 rounded-md h-[16vh] z-60 shadow-inner text-gray-800 w-[46.7vw] overflow-y-auto custom-scrollbar"
                            />
                        </label>
                    </div>

                    <div className="flex flex-col gap-4 w-[48%]">
                        <label className="flex flex-col">
                            <span>City</span>
                            <input 
                                type="text" 
                                name="city" 
                                value={profileData.city} 
                                onChange={handleChange} 
                                className="p-2 rounded-md shadow-inner text-gray-800 w-full"
                            />
                        </label>

                        <label className="flex flex-col">
                            <span>Occupation</span>
                            <select 
                                name="occupation" 
                                value={profileData.occupation} 
                                onChange={handleChange} 
                                className="p-2 rounded-md shadow-inner text-gray-800 w-full"
                            >
                                <option value="">Select Occupation</option>
                                {occupations.map((occupation, index) => (
                                    <option key={index} value={occupation}>{occupation}</option>
                                ))}
                            </select>
                        </label>

                        <label className="flex flex-col">
                            <span>Children</span>
                            <select 
                                name="children" 
                                value={profileData.children} 
                                onChange={handleChange} 
                                className="p-2 rounded-md shadow-inner text-gray-800 w-full"
                            >
                                <option value="">Do you have children?</option>
                                {yesNoOptions.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </label>

                        <label className="flex flex-col">
                            <span>Drinking</span>
                            <select 
                                name="drinking" 
                                value={profileData.drinking} 
                                onChange={handleChange} 
                                className="p-2 rounded-md shadow-inner text-gray-800 w-full"
                            >
                                <option value="">Do you drink?</option>
                                {yesNoOptions.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                </div>
                <button 
                    type="button"
                    onClick={updateProfile}
                    className="mt-4 p-3 w-full rounded-md bg-white text-clr1 font-semibold hover:bg-clr2 hover:text-white transition duration-300 shadow-lg"
                >
                    Update Profile
                </button>
            </form>
            {showPopup && (
                <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-600 bg-opacity-90 text-white p-4 px-6 rounded-lg shadow-2xl z-50 transition-opacity duration-500 ease-in-out animate-fade-in">
                    <div className="flex items-center">
                        <svg className="w-6 h-6 mr-2 text-white opacity-90" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-semibold">Profile Updated</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UpdateProfileForm;
