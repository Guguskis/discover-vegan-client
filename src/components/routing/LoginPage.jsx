import React, {useState} from 'react';
import './LoginPage.less'
import Header from "./Header.jsx";
import {useDictionary} from "../../config/dictionary.jsx";
import TextField from "@material-ui/core/TextField";
import {ObjectState} from "../../utils/utils.jsx";
import Button from "../common/Button.jsx";


export default HomePage;

function HomePage() {
    const {DICTIONARY} = useDictionary();

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const onChangeUpdateUser = (event) => {
        ObjectState.update(setUser, event.target.name, event.target.value)
    }

    const onClickHandleLogin = () => {
        console.log(user)
    }

    const onClickHandleRegister = () => {
        console.log("Register")
    }

    return (
        <div>
            <Header/>
            <div className="login-page-body">
                <div className="login-form">
                    <TextField id="filled-basic"
                               className="input-field"
                               label={DICTIONARY.email}
                               variant="filled"
                               name="email"
                               value={user.email}
                               onChange={onChangeUpdateUser}
                               required={true}/>
                    <TextField id="filled-basic"
                               className="input-field"
                               label={DICTIONARY.password}
                               variant="filled"
                               name="password"
                               type="password"
                               value={user.password}
                               onChange={onChangeUpdateUser}
                               required={true}/>

                    <p className="small-text">
                        {DICTIONARY.dontHaveAccount} <span className="underscored-text"
                                                           onClick={onClickHandleRegister}>{DICTIONARY.signUp}</span>
                    </p>

                    <Button text={DICTIONARY.login}
                            onClick={onClickHandleLogin}/>

                </div>
            </div>
        </div>
    );
}

