import React from 'react';
import './HomePage.less'
import Map from "../map/Map.jsx";
import ProductSearchBar from "../common/ProductSearchBar.jsx";
import Header from "./Header.jsx";
import AddIcon from '@material-ui/icons/Add';
import SmallButton from "../common/SmallButton.jsx";

export default HomePage;

function HomePage() {
    return (
        <Map>
            <Header/>
            <div className="map-overlay-container">
                <ProductSearchBar handleOnOptionSelect={(product) => console.log(product)}/>
                <SmallButton text="Add vendor"
                             icon={<AddIcon/>}/>
            </div>
        </Map>
    );
}

