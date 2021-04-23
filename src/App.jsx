import './App.less';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HomePage from "./components/routing/HomePage.jsx";
import React from "react";
import NotFoundPage from "./components/routing/NotFoundPage.jsx";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import LoginPage from "./components/routing/LoginPage.jsx";
import SignUpPage from "./components/routing/SignUpPage.jsx";

toast.configure({
    position: "top-center",
    autoClose: 5000
})

function App() {
    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/signup" component={SignUpPage}/>
                    <Route path="/products" component={NotFoundPage}/>
                    <Route path="/scan" component={NotFoundPage}/>
                    <Route path="/wishlist" component={NotFoundPage}/>
                    <Route component={NotFoundPage}/>
                </Switch>
            </Router>
        </>
    );
}

export default App;
