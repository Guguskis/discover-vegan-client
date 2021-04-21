import React, {useState} from 'react'
import ReactMapGL from 'react-map-gl'

import './Map.less'
import VendorMarkers from "./VendorMarkers.jsx";
import VendorPopup from "./VendorPopup.jsx";
import useOnDragUpdateVendors from "./useOnDragUpdateVendors.jsx";

const Map = (props) => {
    const [viewport, setViewport] = useState({
        latitude: 54.72744555070343,
        longitude: 25.341746138622348,
        zoom: 13
    });

    const [vendors, handleMouseMove] = useOnDragUpdateVendors({viewport: viewport});
    const [selectedVendor, setSelectedVendor] = useState(null);

    return (
        <div className='map'>
            <ReactMapGL
                {...viewport}
                onViewportChange={setViewport}
                mapStyle="mapbox://styles/mapbox/dark-v9"
                mapboxApiAccessToken={process.env.MAPBOX_ACCESS_TOKEN}
                width='100%'
                height='100%'
                onMouseMove={handleMouseMove}>
                <VendorMarkers vendors={vendors} setVendors={setSelectedVendor}/>
                <VendorPopup vendor={selectedVendor} setVendor={setSelectedVendor}/>
                <div className='ui-overlay'>
                    {props.children}
                </div>
            </ReactMapGL>
        </div>
    );
}

export default Map;
