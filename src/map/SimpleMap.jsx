import React, {useEffect, useState} from 'react'
import ReactMapGL from 'react-map-gl'
import {usePosition} from 'use-position';

import './SimpleMap.css'
import {Guid} from "../utils/utils";
import PlaceMarkers from "./PlaceMarkers";
import PlacePopup from "./PlacePopup";

const SimpleMap = () => {
    const {latitude, longitude} = usePosition(false);
    const [popupInfo, setPopupInfo] = useState(null);

    const [viewport, setViewport] = useState({
        latitude: 40.67,
        longitude: -13.59,
        width: '100vw',
        height: '100vh',
        zoom: 13
    });

    const [places, setPlaces] = useState([
        {
            id: '1',
            position: {longitude: 25.341746138622348, latitude: 54.72744555070343},
            title: 'Maxima XXX',
            products: [{
                id: 1,
                title: 'tofu',
                description: 'a lot of protein, low sugar, healthy',
                imageUrl: 'https://www.veggo.lt/991-home_default/organic-tofu-picknicker-50g-viana.jpg'
            },
                {
                    id: 1,
                    title: 'tofu',
                    description: 'a lot of protein, low sugar, healthy',
                    imageUrl: 'https://www.veggo.lt/991-home_default/organic-tofu-picknicker-50g-viana.jpg'
                }]
        },
        {
            id: '2',
            position: {longitude: 25.348183440258097, latitude: 54.72298451304856},
            title: 'Maxima XXX',
            products: [{
                id: 1,
                title: 'tofu',
                description: 'a lot of protein, low sugar, healthy',
                imageUrl: 'https://www.veggo.lt/147-home_default/ekologiskas-keptas-tempeh.jpg'
            },
                {
                    id: 1,
                    title: 'tofu',
                    description: 'a lot of protein, low sugar, healthy',
                    imageUrl: 'https://www.veggo.lt/147-home_default/ekologiskas-keptas-tempeh.jpg'
                }]
        },
        {
            id: '3',
            position: {longitude: 25.33977203278708, latitude: 54.716093723400704},
            title: 'Maxima XXX',
            products: [{
                id: 1,
                title: 'tofu',
                description: 'a lot of protein, low sugar, healthy',
                imageUrl: 'https://www.veggo.lt/839-home_default/ekologiskas-fermentuotas-tofu-su-laiskiniais-cesnakais-130g-lord-of-tofu.jpg'
            },
                {
                    id: 1,
                    title: 'tofu',
                    description: 'a lot of protein, low sugar, healthy',
                    imageUrl: 'https://www.veggo.lt/839-home_default/ekologiskas-fermentuotas-tofu-su-laiskiniais-cesnakais-130g-lord-of-tofu.jpg'
                }]
        },
        {
            id: '4',
            position: {longitude: 25.32149009614157, latitude: 54.718473409062995},
            title: 'Maxima XXX',
            products: [{
                id: 1,
                title: 'tofu',
                description: 'a lot of protein, low sugar, healthy',
                imageUrl: 'https://www.veggo.lt/549-home_default/ekologiskas-silkinis-tofu.jpg'
            },
                {
                    id: 1,
                    title: 'tofu',
                    description: 'a lot of protein, low sugar, healthy',
                    imageUrl: 'https://www.veggo.lt/549-home_default/ekologiskas-silkinis-tofu.jpg'
                }]
        },
    ]);

    const onClickAddPlace = (data) => {

        const marker = {
            id: `${Guid.newGuid()}`,
            position: {
                longitude: data.lngLat[0],
                latitude: data.lngLat[1]
            }
        };
        console.table(places)
        setPlaces(markers => [...markers, marker])
    }

    useEffect(() => {
        if (latitude && longitude) {
            setViewport({
                ...viewport,
                longitude: longitude,
                latitude: latitude
            })
        }
    }, [latitude, longitude])

    // if (!latitude || !longitude)
    //     return (<div>Getting your location</div>)

    return (
        <ReactMapGL className='map'
                    {...viewport}
                    onViewportChange={setViewport}
                    mapStyle="mapbox://styles/mapbox/dark-v9"
            // onClick={onClickAddPlace}
        >
            <PlaceMarkers places={places} setPopupInfo={setPopupInfo}/>
            <PlacePopup popupInfo={popupInfo} setPopupInfo={setPopupInfo}/>
        </ReactMapGL>
    );
}

export default SimpleMap;
