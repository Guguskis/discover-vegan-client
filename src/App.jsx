import './App.less';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HomePage from "./components/routing/HomePage.jsx";
import React from "react";
import NotFoundPage from "./components/routing/NotFoundPage.jsx";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

function App() {
    return (
        <>
            <ToastContainer closeButton={false} position="bottom-right"/>
            <Router>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route component={NotFoundPage}/>
                </Switch>
            </Router>
        </>
    );
}

export default App;
