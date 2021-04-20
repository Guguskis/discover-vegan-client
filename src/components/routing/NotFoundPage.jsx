import React from 'react';
import Header from "./Header.jsx";
import "./NotFoundPage.less"
import {DICTIONARY} from "../../config/dictionary.jsx";

function NotFoundPage() {
    return (
        <div>
            <Header/>
            <div className="page-container">{DICTIONARY.pageNotFound}</div>
        </div>
    );
}

export default NotFoundPage;
