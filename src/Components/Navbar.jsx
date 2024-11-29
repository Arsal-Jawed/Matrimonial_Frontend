import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/navbar.css';
import Login from '../Components/Login';

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const OpenLogin = () => setOpen(true);
  const CloseLogin = () => setOpen(false);

  const scrollFeature = () => {
    window.scrollBy({
      top: 2450,
      behavior: 'smooth',
    });
  };
  const scrollAbout = () => {
    window.scrollBy({
      top: 4300,
      behavior: 'smooth',
    });
  };
  const scrollContact = () => {
    window.scrollBy({
      top: 5500,
      behavior: 'smooth',
    });
  };

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <header className="header">
      {isOpen && <Login onClose={CloseLogin}/>}
      <div className="inner-header">
        <div className="container-header">
          <div className="main-header">
            <div className="bars" id="open" onClick={toggleMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
              </svg>
            </div>
            <div className="logo">
              <div className='flex flex-row justify-center items-center'>
              <img src='icon.png' alt='Logo' className='h-[10vh] w-[7vw]'/>
              <p className='text-clr1 font-semibold text-[1.8vw] italic'>Matrimonial AI</p>
              </div>
            </div>
            <nav className={`list-items ${isActive ? 'active' : ''}`} id="show">
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#" onClick={scrollAbout}>About</a></li>
                <li><a href="#" onClick={scrollContact}>Contact</a></li>
                <li><a href="#" onClick={scrollFeature}>Features</a></li>
              </ul>
            </nav>
            <div className='flex flex-row gap-[3vw] md:gap-[1vw]'>
              <button className='text-[white] font-bold md:text-[1.2vw] hover:underline' onClick={OpenLogin}>Login</button>
             <Link to="/signup">
              <button className='text-white md:text-[1.2vw] font-bold bg-clr2 rounded-[4vw] md:rounded-[2vw] w-[20vw] md:w-[10vw] h-[6vh] md:h-[6vh] hover:bg-white hover:text-clr2'>SignUp</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
