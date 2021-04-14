import React from 'react';
import {NavLink} from "react-router-dom";
import "./Header.less"


function Header() {
    return (
        <div className="header">
            <div className='routing-container'>
                <NavLink exact to='/' className="routing-item" activeClassName="active">Home</NavLink>
                <NavLink to='/map' className="routing-item" activeClassName="active">Map</NavLink>
                <NavLink to='/products' className="routing-item" activeClassName="active">Products</NavLink>
            </div>
            <div className='account-container'>
                <NavLink exact to='/' className="routing-item" activeClassName="active">Login</NavLink>
                <NavLink exact to='/' className="routing-item" activeClassName="active">Register</NavLink>
            </div>
        </div>
    );
}

export default Header;
