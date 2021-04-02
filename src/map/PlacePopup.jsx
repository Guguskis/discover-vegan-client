import React from 'react';
import {Popup} from "react-map-gl";

const PlacePopup = (props) => {
    const {popupInfo, setPopupInfo} = props;

    if (!popupInfo) return null;

    return (
        <Popup
            tipSize={15}
            anchor="bottom"
            offsetTop={-15}
            longitude={popupInfo.position.longitude}
            latitude={popupInfo.position.latitude}
            closeOnClick={false}
            onClose={setPopupInfo}
        >
            <div>XXXXXX</div>
        </Popup>
    );
};

export default PlacePopup;
