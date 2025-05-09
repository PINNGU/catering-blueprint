import React from 'react'
import {Link} from 'react-router-dom'
import "./Navbar.css"
import {ReactComponent as HomeIcon } from "../assets/home.svg"
import {ReactComponent as SettingsIcon } from "../assets/settings.svg"

function Navbar ({showShadow}){
  

    return (
        <nav className={`navbar ${showShadow ? 'navbar-dark' : ''}`} >

        <div>   
            <ul>   
                <li>    
                    <a href="#">
                        <HomeIcon className="home-icon"/>
                    </a>
                </li> 
                <li>    
                    <a href="#">
                        Meni
                    </a>
                </li>
                <li>    
                    <a href="#">
                        Utisci
                    </a>
                </li>
                <li>    
                    <a href="#"> 
                        Kontakt
                    </a>
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