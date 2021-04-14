import React from 'react';
import './HomePage.less'
import Map from "../map/Map.jsx";
import SearchBar from "../common/SearchBar.jsx";
import Header from "./Header.jsx";

export default HomePage;

function HomePage() {
    return (
        <Map>
            <Header/>
            <SearchBar/>
        </Map>
    );
}

