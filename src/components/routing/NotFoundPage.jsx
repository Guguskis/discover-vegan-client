import React from 'react';
import Header from "./Header.jsx";
import "./NotFoundPage.less"


function NotFoundPage() {
    return (
        <div>
            <Header/>
            <div className="page-container">{DICTIONARY.pageNotFound}</div>
        </div>
    );
}

export default NotFoundPage;
