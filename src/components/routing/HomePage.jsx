import React from 'react';
import './HomePage.less'
import Map from "../map/Map.jsx";
import ProductSearchBar from "../common/ProductSearchBar.jsx";
import Header from "./Header.jsx";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';

export default HomePage;

function HomePage() {
    return (
        <Map>
            <Header/>
            <div className="map-overlay-container">
                <ProductSearchBar handleOnOptionSelect={(product) => console.log(product)}/>
                <Button variant="contained" size="small" startIcon={<AddIcon/>}>Add vendor</Button>
            </div>
        </Map>
    );
}

