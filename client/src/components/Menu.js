import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import "./Menu.css"

function Menu(){
    const isLoggedIn = () => {
        const token = localStorage.getItem('adminToken');
        return !!token;
    };

    return(
        <div className="menu">

        </div>
    );
}

export default Menu;