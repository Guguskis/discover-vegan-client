import React from 'react';
import {NavLink} from "react-router-dom";
import "./Header.less"


function Header() {
    return (
        <div className="header">
            <div className='routing-container'>
                <NavLink exact to='/' className="routing-item" activeClassName="active">Map</NavLink>
                <NavLink to='/products' className="routing-item" activeClassName="active">Products</NavLink>
                <NavLink to='/scan' className="routing-item" activeClassName="active">Scan</NavLink>
                <NavLink to='/trends' className="routing-item" activeClassName="active">Trends</NavLink>
                <NavLink to='/wishlist' className="routing-item" activeClassName="active">Wishlist</NavLink>
            </div>
            <div className='account-container'>
                <NavLink exact to='/login' className="routing-item" activeClassName="active">Login</NavLink>
                <NavLink exact to='/register' className="routing-item" activeClassName="active">Register</NavLink>
            </div>
        </div>
    );
}

export default Header;
