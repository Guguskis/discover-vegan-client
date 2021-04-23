import React from 'react';
import Header from "./Header.jsx";
import "./NotFoundPage.less"
import {useDictionary} from "../../config/dictionary.jsx";


function NotFoundPage() {

    const {DICTIONARY} = useDictionary();

    return (
        <div>
            <Header/>
            <div className="page-container">{DICTIONARY.pageNotFound}</div>
        </div>
    );
}

export default NotFoundPage;
