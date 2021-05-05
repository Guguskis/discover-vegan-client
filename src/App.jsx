import './App.less';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HomePage from "./components/routing/HomePage.jsx";
import React, {useEffect} from "react";
import NotFoundPage from "./components/routing/NotFoundPage.jsx";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import LoginPage from "./components/routing/LoginPage.jsx";
import SignUpPage from "./components/routing/SignUpPage.jsx";
import jwt_decode from "jwt-decode";
import {useStore} from "react-context-hook";

toast.configure({
    position: "top-center",
    autoClose: 5000
})

function App() {

    const [user, setUser] = useStore('user')
    const [forceRerender] = useStore('forceRerender') // don't delete - forces react state update from root on language change

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            const decodedUser = jwt_decode(token)
            setUser({
                userId: decodedUser.userId,
                userType: decodedUser.userType
            })
        }
    }, [])

    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/signup" component={SignUpPage}/>
                    <Route path="/wishlist" component={NotFoundPage}/>
                    <Route path="/trends" component={NotFoundPage}/>
                    <Route component={NotFoundPage}/>
                </Switch>
            </Router>
        </>
    );
}

export default App;
