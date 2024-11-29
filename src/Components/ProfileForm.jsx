import React, { useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import 'react-phone-number-input/style.css';
import {useNavigate} from 'react-router-dom';
import CONFIG from '../Configuration';

function ProfileForm() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [religion, setReligion] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [occupation, setOccupation] = useState('');
  const [education, setEducation] = useState('');
  const [build, setBuild] = useState('');
  const [children, setChildren] = useState('');
  const [smoking, setSmoking] = useState('');
  const [drinking, setDrinking] = useState('');
  const [description, setDescription] = useState('');

  const [errors, setErrors] = useState({});

  const StoredData = localStorage.getItem("RegisteredUser");
  const RegisteredUser = JSON.parse(StoredData);

  const IP = CONFIG.IP || 'localhost';
  const PORT = CONFIG.PORT;

  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!country) newErrors.country = 'Country is required';
    if (!city) newErrors.city = 'City is required';
    if (!religion) newErrors.religion = 'Religion is required';
    if (!maritalStatus) newErrors.maritalStatus = 'Marital Status is required';
    if (!occupation) newErrors.occupation = 'Occupation is required';
    if (!education) newErrors.education = 'Education is required';
    if (!build) newErrors.build = 'Build is required';
    if (!children) newErrors.children = 'Children information is required';
    if (!smoking) newErrors.smoking = 'Smoking information is required';
    if (!drinking) newErrors.drinking = 'Drinking information is required';
    if (!description) newErrors.description = 'Description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validateForm()) {
      
      const formData = new FormData();
      formData.append('email',RegisteredUser.email);
      formData.append('image',image);
      formData.append('country',country);
      formData.append('city',city);
      formData.append('religion',religion);
      formData.append('maritalStatus',maritalStatus);
      formData.append('occupation',occupation);
      formData.append('education',education);
      formData.append('build',build);
      formData.append('children',children);
      formData.append('smoking',smoking);
      formData.append('drinking',drinking);
      formData.append('description',description);

      console.log(RegisteredUser.email);      
      const response = await fetch(`http://${IP}:${PORT}/users/createProfile`,{

        method:'POST',
        body: formData
      });

      if(response.ok){
        navigate('/');
      }else{
        console.log("Failed to save Profile");
      }

      
    }
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

  const occupations = [
    "Accountant", "Actor", "Architect", "Artist", "Banker", "Business Analyst", "Chef", "Civil Engineer", "Consultant", "Content Creator",
    "Cybersecurity Specialist", "Data Analyst", "Dentist", "Designer", "Doctor", "Driver", "Electrician", "Engineer", "Entrepreneur", 
    "Financial Analyst", "Firefighter", "Graphic Designer", "HR Manager", "Industrial Worker", "Journalist", "Labour", "Lawyer", 
    "Marketing Manager", "Mechanic", "Military" ,"Musician", "Nurse", "Nutritionist", "Pharmacist", "Photographer", "Pilot", "Plumber", "Police Officer",
    "Product Manager", "Professor", "Project Manager", "Public Relations Specialist", "Real Estate Agent", "Researcher", "Sales Manager", 
    "Scientist", "Social Worker", "Software Engineer", "Software Tester", "Student", "Teacher", "Therapist", "Translator", "Veterinarian", 
    "Video Editor", "Web Developer"
  ];
  
  

  const religions = ["Christianity", "Islam", "Hinduism", "Buddhism", "Sikhism", "Judaism", "Bahá'í", "Jainism", "Shinto"];

  const builds = ["Slim", "Average", "Athletic", "Heavy", "Muscular", "Chubby", "Plump"];

  return (
    <div className="flex items-center justify-center bg-gray-200">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg p-8 md:w-[48vw] w-[100vw]">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Create Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-[50vw] h-[50vw] md:w-[16vw] md:h-[16vw] rounded-full overflow-hidden border border-gray-300 bg-gray-200">
              {imagePreview ? (
                  <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </div>
              <label htmlFor="imageUpload" className="absolute bottom-0 right-0 p-2 bg-white rounded-full cursor-pointer">
                <FaCamera className="text-gray-600" />
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col">
              <label className="text-clr2 mb-2" htmlFor="country">Country</label>
              <select
                id="country"
                className={`w-full p-3 rounded-lg bg-transparent border ${errors.country ? 'border-red-500' : 'border-gray-300'} text-gray-700 focus:outline-none focus:border-blue-400 focus:shadow-sm`}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Select Country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>{country}</option>
                ))}
              </select>
              {errors.country && <span className="text-red-500">{errors.country}</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-clr2 mb-2" htmlFor="city">City</label>
              <input
                id="city"
                type="text"
                placeholder="Enter Your City"
                className={`w-full p-3 rounded-lg bg-transparent border ${errors.city ? 'border-red-500' : 'border-gray-300'} text-gray-700 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-sm`}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              {errors.city && <span className="text-red-500">{errors.city}</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-clr2 mb-2" htmlFor="religion">Religion</label>
              <select
                id="religion"
                className={`w-full p-3 rounded-lg bg-transparent border ${errors.religion ? 'border-red-500' : 'border-gray-300'} text-gray-700 focus:outline-none focus:border-blue-400 focus:shadow-sm`}
                value={religion}
                onChange={(e) => setReligion(e.target.value)}
              >
                <option value="">Select Religion</option>
                {religions.map((religion, index) => (
                  <option key={index} value={religion}>{religion}</option>
                ))}
              </select>
              {errors.religion && <span className="text-red-500">{errors.religion}</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-clr2 mb-2" htmlFor="maritalStatus">Marital Status</label>
              <select
                id="maritalStatus"
                className={`w-full p-3 rounded-lg bg-transparent border ${errors.maritalStatus ? 'border-red-500' : 'border-gray-300'} text-gray-700 focus:outline-none focus:border-blue-400 focus:shadow-sm`}
                value={maritalStatus}
                onChange={(e) => setMaritalStatus(e.target.value)}
              >
                <option value="">Select Marital Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
              {errors.maritalStatus && <span className="text-red-500">{errors.maritalStatus}</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-clr2 mb-2" htmlFor="occupation">Occupation</label>
              <select
                  id="occupation"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  className={`w-full p-3 rounded-lg bg-transparent border ${errors.occupation ? 'border-red-500' : 'border-gray-300'} text-gray-700 focus:outline-none focus:border-blue-400 focus:shadow-sm`}
                >
          <option value="" disabled>Select your occupation</option>
          {occupations.map((occupation, index) => (
            <option key={index} value={occupation}>
              {occupation}
            </option>
          ))}
        </select>
              {errors.occupation && <span className="text-red-500">{errors.occupation}</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-clr2 mb-2" htmlFor="education">Education</label>
              <input
                id="education"
                type="text"
                placeholder="Enter Your Education"
                className={`w-full p-3 rounded-lg bg-transparent border ${errors.education ? 'border-red-500' : 'border-gray-300'} text-gray-700 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-sm`}
                value={education}
                onChange={(e) => setEducation(e.target.value)}
              />
              {errors.education && <span className="text-red-500">{errors.education}</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-clr2 mb-2" htmlFor="build">Build</label>
              <select
                id="build"
                className={`w-full p-3 rounded-lg bg-transparent border ${errors.build ? 'border-red-500' : 'border-gray-300'} text-gray-700 focus:outline-none focus:border-blue-400 focus:shadow-sm`}
                value={build}
                onChange={(e) => setBuild(e.target.value)}
              >
                <option value="">Select Build</option>
                {builds.map((build, index) => (
                  <option key={index} value={build}>{build}</option>
                ))}
              </select>
              {errors.build && <span className="text-red-500">{errors.build}</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-clr2 mb-2" htmlFor="children">Children</label>
              <select
                id="children"
                className={`w-full p-3 rounded-lg bg-transparent border ${errors.children ? 'border-red-500' : 'border-gray-300'} text-gray-700 focus:outline-none focus:border-blue-400 focus:shadow-sm`}
                value={children}
                onChange={(e) => setChildren(e.target.value)}
              >
                <option value="">Do you have children?</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.children && <span className="text-red-500">{errors.children}</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-clr2 mb-2" htmlFor="smoking">Smoking</label>
              <select
                id="smoking"
                className={`w-full p-3 rounded-lg bg-transparent border ${errors.smoking ? 'border-red-500' : 'border-gray-300'} text-gray-700 focus:outline-none focus:border-blue-400 focus:shadow-sm`}
                value={smoking}
                onChange={(e) => setSmoking(e.target.value)}
              >
                <option value="">Do you smoke?</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.smoking && <span className="text-red-500">{errors.smoking}</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-clr2 mb-2" htmlFor="drinking">Drinking</label>
              <select
                id="drinking"
                className={`w-full p-3 rounded-lg bg-transparent border ${errors.drinking ? 'border-red-500' : 'border-gray-300'} text-gray-700 focus:outline-none focus:border-blue-400 focus:shadow-sm`}
                value={drinking}
                onChange={(e) => setDrinking(e.target.value)}
              >
                <option value="">Do you drink?</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.drinking && <span className="text-red-500">{errors.drinking}</span>}
            </div>
          </div>
          <div className="flex flex-col mt-6">
            <label className="text-clr2 mb-2" htmlFor="description">Description</label>
            <textarea
              id="description"
              rows="5"
              placeholder="Describe yourself..."
              className={`w-full p-3 rounded-lg bg-transparent border ${errors.description ? 'border-red-500' : 'border-gray-300'} text-gray-700 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-sm`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && <span className="text-red-500">{errors.description}</span>}
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full p-3 rounded-lg bg-clr2 text-white font-semibold text-lg hover:bg-clr1"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileForm;
