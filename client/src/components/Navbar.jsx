import React from 'react'
import {Link} from 'react-router-dom'
import "./Navbar.css"
import {ReactComponent as HomeIcon } from "../assets/home.svg"
import {ReactComponent as SettingsIcon } from "../assets/settings.svg"
import menuIcon from "../assets/menu.png"
import { NavLink } from 'react-router-dom'

function Navbar ({showShadow}){
  

    return (
        <nav className={`navbar ${showShadow ? 'navbar-dark' : ''}`} >

        <div>   
            <ul>   
                <li>    
                    <NavLink to="/">
                        <HomeIcon className="home-icon"/>
                    </NavLink>
                </li> 
                <li>    
                    <NavLink to="/menu">
                        <img src={menuIcon} alt="Menu Icon" className="menu-icon"></img>
                    </NavLink>
                </li>
 
                <li>    
                    <a href="#"> 
                        <SettingsIcon className="home-icon"/>
                    </a>
                </li>
            </ul>
            
        </div>

        </nav>
    );
};

export default Navbar;