import React, {useState} from 'react';
import './HomePage.less'
import Map from "../map/Map.jsx";
import ProductSearchBar from "../common/ProductSearchBar.jsx";
import Header from "./Header.jsx";
import AddIcon from '@material-ui/icons/Add';
import SmallButton from "../common/SmallButton.jsx";
import {useDictionary} from "../../config/dictionary.jsx";
import Modal from "@material-ui/core/Modal";
import ProductVendorDetailsForm from "../common/ProductVendorDetailsForm.jsx";
import useOnDragUpdateVendors from "../map/useOnDragUpdateVendors.jsx";
import {DEFAULTS} from "../../config/config.jsx";


export default HomePage;

function HomePage() {
    const {DICTIONARY} = useDictionary();

    const [viewport, setViewport] = useState({
        latitude: 54.72744555070343,
        longitude: 25.341746138622348,
        zoom: 13,
        maxZoom: DEFAULTS.MAP.MAX_ZOOM
    });

    const [displayVendorDetailsOpen, setDisplayVendorDetailsOpen] = useState(false);
    const [searchBarSelectedProduct, setSearchBarSelectedProduct] = useState();
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [vendors, onViewStateChange] = useOnDragUpdateVendors(viewport, selectedVendor);


    const handleOnProductSelect = (product) => {
        setSearchBarSelectedProduct(product)
        setDisplayVendorDetailsOpen(true)
    }

    const onCloseHideVendorDetails = () => {
        setDisplayVendorDetailsOpen(false);
    }

    return (
        <Map vendors={vendors}
             selectedVendor={selectedVendor}
             setSelectedVendor={setSelectedVendor}
             onViewStateChange={onViewStateChange}
             viewport={viewport}
             setViewport={setViewport}>

            <Header/>
            <div className="map-overlay-container">
                <ProductSearchBar handleOnProductSelect={handleOnProductSelect}/>
                <SmallButton text={DICTIONARY.addVendor}
                             icon={<AddIcon/>}/>
            </div>

            <Modal
                open={displayVendorDetailsOpen}
                onClose={onCloseHideVendorDetails}
                className="modal-container"
            >
                <div><ProductVendorDetailsForm product={searchBarSelectedProduct}/></div>
            </Modal>
        </Map>
    );
}

