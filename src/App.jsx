import './App.less';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import HomePage from "./components/routing/HomePage.jsx";
import React from "react";

function App() {
    return (
        <Router>
            <Route exact path="/" component={HomePage}/>
        </Router>
    );
}

export default App;
