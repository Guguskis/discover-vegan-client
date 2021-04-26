import React from 'react';
import './HomePage.less'
import Map from "../map/Map.jsx";
import ProductSearchBar from "../common/ProductSearchBar.jsx";
import Header from "./Header.jsx";
import AddIcon from '@material-ui/icons/Add';
import SmallButton from "../common/SmallButton.jsx";
import {useDictionary} from "../../config/dictionary.jsx";


export default HomePage;

function HomePage() {
    const {DICTIONARY} = useDictionary();

    const handleOnProductSelect = (product) => {
        // todo show modal to display vendors
        console.log(product)
    }

    return (
        <Map>
            <Header/>
            <div className="map-overlay-container">
                <ProductSearchBar handleOnProductSelect={handleOnProductSelect}/>
                <SmallButton text={DICTIONARY.addVendor}
                             icon={<AddIcon/>}/>
            </div>
        </Map>
    );
}

