import React from 'react'
import {Link} from 'react-router-dom'
import "./Navbar.css"
import {ReactComponent as HomeIcon } from "../assets/home.svg"
import {ReactComponent as SettingsIcon } from "../assets/settings.svg"
import {ReactComponent as MenuIcon} from "../assets/menu.svg"
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
                        <MenuIcon className="home-icon"/>
                    </NavLink>
                </li>
 
                <li>    
                    <NavLink to="/admin-login"> 
                        <SettingsIcon className="home-icon"/>
                    </NavLink>
                </li>
            </ul>
            
        </div>

        </nav>
    );
};

export default Navbar;