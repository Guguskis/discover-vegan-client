import React from 'react';
import {NavLink} from "react-router-dom";
import "./Header.less"
import {useDictionary} from "../../config/dictionary.jsx";


function Header() {
    const {DICTIONARY} = useDictionary();

    return (
        <div className="header">
            <div className='routing-container'>
                <NavLink exact to='/' className="routing-item"
                         activeClassName="active">{DICTIONARY.map}</NavLink>
                <NavLink to='/products' className="routing-item"
                         activeClassName="active">{DICTIONARY.products}</NavLink>
                <NavLink to='/scan' className="routing-item"
                         activeClassName="active">{DICTIONARY.scan}</NavLink>
                <NavLink to='/trends' className="routing-item"
                         activeClassName="active">{DICTIONARY.trends}</NavLink>
                <NavLink to='/wishlist' className="routing-item"
                         activeClassName="active">{DICTIONARY.wishList}</NavLink>
            </div>
            <div className='account-container'>
                <NavLink exact to='/login' className="routing-item"
                         activeClassName="active">{DICTIONARY.login}</NavLink>
                <NavLink exact to='/register' className="routing-item"
                         activeClassName="active">{DICTIONARY.register}</NavLink>
            </div>
        </div>
    );
}

export default Header;
