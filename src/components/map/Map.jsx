import React, {useEffect, useState} from 'react'
import ReactMapGL from 'react-map-gl'

import './Map.less'
import VendorMarkers from "./VendorMarkers.jsx";
import VendorPopup from "./VendorPopup.jsx";
import useOnDragUpdateVendors from "./useOnDragUpdateVendors.jsx";
import {DEFAULTS} from "../../config/config.jsx";

const Map = (props) => {
    const [viewport, setViewport] = useState({
        latitude: 54.72744555070343,
        longitude: 25.341746138622348,
        zoom: 13,
        maxZoom: DEFAULTS.MAP.MAX_ZOOM
    });

    const [vendors, oneViewStateChange] = useOnDragUpdateVendors(viewport);
    const [selectedVendor, setSelectedVendor] = useState(null);

    useEffect(() => {
        if (!selectedVendor) {
            return;
        }
        if (vendors.some(fetchedVendor => fetchedVendor.id === selectedVendor.id)) {
            // const fetchedVendor = vendors.filter(fetchedVendor => fetchedVendor.id === selectedVendor.id)[0];
        //     console.log("Selected vendor should remain")
        //     console.log(fetchedVendor)
        //     console.log(vendors)
            return;
        }
        //
        // console.log("Vendor unselected")
        setSelectedVendor({});
    }, [vendors])

    useEffect(() => {
        console.log("Selected vendor changed to")
        console.log(selectedVendor)
    }, [selectedVendor])

    return (
        <div className='map'>
            <ReactMapGL
                {...viewport}
                onViewportChange={setViewport}
                mapStyle="mapbox://styles/mapbox/dark-v9"
                mapboxApiAccessToken={process.env.MAPBOX_ACCESS_TOKEN}
                width='100%'
                height='100%'
                onInteractionStateChange={oneViewStateChange}>
                <VendorMarkers vendors={vendors} setSelectedVendor={setSelectedVendor}/>
                <VendorPopup vendor={selectedVendor} setSelectedVendor={setSelectedVendor}/>
                <div className='ui-overlay'>
                    {props.children}
                </div>
            </ReactMapGL>
        </div>
    );
}

export default Map;
