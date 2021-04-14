import React from 'react';
import {Link} from "react-router-dom";
import "./Header.less"


function Header() {
    return (
        <div className='header-container'>
            <Link className="routing-item" to='/'>Home</Link>
            <Link className="routing-item" to='/map'>Map</Link>
            <Link className="routing-item" to='/map'>Map</Link>
        </div>
    );
}

export default Header;
