import React from 'react';
import './Home.less'
import SimpleMap from "../map/SimpleMap.jsx";

export default Home;

function Home() {
    return (
        <SimpleMap/>
        // <div className='chairContainer'>
        //     <div className='title'>ULTRA CHAIR</div>
        //     <div className='details'>super cheap and sturdy chair</div>
        // </div>
    );
}

