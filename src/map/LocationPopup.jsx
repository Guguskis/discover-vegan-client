import React from 'react';
import {Popup} from "react-map-gl";

const LocationPopup = (props) => {
    const {popupInfo, setPopupInfo} = props;

    if (!popupInfo) return null;

    return (
        <Popup
            tipSize={15}
            anchor="bottom"
            offsetTop={-15}
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            closeOnClick={false}
            onClose={setPopupInfo}
        >
            <div>XXXXXX</div>
        </Popup>
    );
};

export default LocationPopup;
