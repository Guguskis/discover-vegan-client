import React, {useEffect, useState} from 'react';
import './HomePage.less'
import Map from "../map/Map.jsx";
import ProductSearchBar from "../common/ProductSearchBar.jsx";
import Header from "./Header.jsx";
import {useDictionary} from "../../config/dictionary.jsx";
import Modal from "@material-ui/core/Modal";
import ProductVendorDetailsForm from "../common/ProductVendorDetailsForm.jsx";
import useOnDragUpdateVendors from "../map/useOnDragUpdateVendors.jsx";
import {DEFAULTS} from "../../config/config.jsx";
import {FlyToInterpolator} from "react-map-gl";
import {easeCubic} from "d3-ease";
import {ToggleButton} from "@material-ui/lab";
import {usePosition} from 'use-position';
import {ArraysState, ObjectState} from "../../utils/utils.jsx";
import {useStore} from "react-context-hook";

export default HomePage;

function HomePage() {
    const {DICTIONARY} = useDictionary();

    const {latitude, longitude} = usePosition(false);
    const [location, setLocation] = useStore('location')

    const [viewport, setViewport] = useState({
        latitude: 54.72744555070343,
        longitude: 25.341746138622348,
        zoom: 13,
        maxZoom: DEFAULTS.MAP.MAX_ZOOM
    });

    const [displayVendorDetailsOpen, setDisplayVendorDetailsOpen] = useState(false);
    const [searchBarSelectedProduct, setSearchBarSelectedProduct] = useState();
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [vendors, onViewStateChange, setAlwaysDisplayVendors] = useOnDragUpdateVendors(viewport, selectedVendor);
    const [showEmptyVendors, setShowEmptyVendors] = useState(false)

    const handleOnProductSelect = (product) => {
        setSearchBarSelectedProduct(product)
        setDisplayVendorDetailsOpen(true)
    }

    const onCloseHideVendorDetails = () => {
        setDisplayVendorDetailsOpen(false);
    }

    const flyToVendor = (vendor) => {
        onCloseHideVendorDetails()

        ArraysState.add(setAlwaysDisplayVendors, vendor)
        // todo add callback on transition end to remove from setAlwaysDisplayVendors

        setViewport({
            ...viewport,
            longitude: vendor.longitude,
            latitude: vendor.latitude,
            zoom: 15,
            transitionDuration: 1000,
            transitionInterpolator: new FlyToInterpolator(),
            transitionEasing: easeCubic,
        });
    }

    const getFilterVendors = () => {
        if (showEmptyVendors) {
            return vendors;
        }

        return vendors
            .filter(vendor => vendor.productCount > 0);
    }

    useEffect(() => {
        if (latitude !== undefined && longitude !== undefined) {
            ObjectState.update(setViewport, "latitude", latitude)
            ObjectState.update(setViewport, "longitude", longitude)
            setLocation({
                latitude: latitude,
                longitude: longitude
            })
        }
    }, [latitude, longitude])

    return (
        <Map vendors={getFilterVendors()}
             selectedVendor={selectedVendor}
             setSelectedVendor={setSelectedVendor}
             onViewStateChange={onViewStateChange}
             viewport={viewport}
             setViewport={setViewport}>

            <Header/>
            <div className="map-overlay-container">
                <ProductSearchBar handleOnProductSelect={handleOnProductSelect}/>
                <ToggleButton className="small-toggle-button"
                              value="italic"
                              selected={showEmptyVendors}
                              onChange={() => setShowEmptyVendors(!showEmptyVendors)}>
                    {DICTIONARY.showEmpty}
                </ToggleButton>
            </div>

            <Modal
                open={displayVendorDetailsOpen}
                onClose={onCloseHideVendorDetails}
                className="modal-container"
            >
                <div><ProductVendorDetailsForm
                    product={searchBarSelectedProduct}
                    onClose={onCloseHideVendorDetails}
                    flyToVendor={flyToVendor}/></div>
            </Modal>
        </Map>
    );
}

