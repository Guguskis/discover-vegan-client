import React from 'react';
import {NavLink} from "react-router-dom";
import "./Header.less"
import {useDictionary} from "../../config/dictionary.jsx";
import {useStore} from "react-context-hook";
import LanguageDropdown from "../common/LanguageDropdown.jsx";

function Header() {
    const {DICTIONARY} = useDictionary();
    const [user, setUser] = useStore('user')
    const userLoggedIn = user !== null && user !== undefined;

    const logout = () => {
        setUser(null)
        localStorage.removeItem("token")
    }

    return (
        <div className="header">
            <div className='routing-container'>
                <NavLink exact to='/' className="routing-item"
                         activeClassName="active">{DICTIONARY.map}</NavLink>
                <NavLink to='/trends' className="routing-item"
                         activeClassName="active">{DICTIONARY.trends}</NavLink>
            </div>
            <div className='user-container'>
                {userLoggedIn ?
                    <NavLink exact to='/' className="routing-item" onClick={logout}
                             activeClassName="active">{DICTIONARY.logout}</NavLink>
                    : null}
                {!userLoggedIn ?
                    <NavLink exact to='/login' className="routing-item"
                             activeClassName="active">{DICTIONARY.login}</NavLink>
                    : null}
                {!userLoggedIn ?
                    <NavLink exact to='/signup' className="routing-item"
                             activeClassName="active">{DICTIONARY.signUp}</NavLink>
                    : null}
                <LanguageDropdown/>
            </div>
        </div>
    );
}

export default Header;
