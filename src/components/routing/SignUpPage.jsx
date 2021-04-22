import React, {useState} from 'react';
import './SignUpPage.less'
import Header from "./Header.jsx";
import {useDictionary} from "../../config/dictionary.jsx";
import TextField from "@material-ui/core/TextField";
import {ObjectState} from "../../utils/utils.jsx";
import Button from "../common/Button.jsx";
import {toast} from "react-toastify";


export default HomePage;

function HomePage() {
    const {DICTIONARY} = useDictionary();

    const [user, setUser] = useState({
        email: "",
        password: "",
        repeatPassword: ""
    });

    const onChangeUpdateUser = (event) => {
        ObjectState.update(setUser, event.target.name, event.target.value)
    }

    const onClickHandleRegister = () => {

        try {
            validate()
        } catch (ex) {
            toast.error(ex.message)
            return;
        }

        console.log("SignUp")
    }

    const validate = () => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!emailRegex.test(user.email)) {
            throw new Error(DICTIONARY.invalidEmail)
        }
        if (user.password.length < 8) {
            throw new Error(DICTIONARY.passwordMustBeAtLeastNCharacters)
        }
        if (user.password !== user.repeatPassword) {
            throw new Error(DICTIONARY.passwordsMustMatch)
        }
    }

    return (
        <div>
            <Header/>
            <div className="sign-up-page-body">

                <div className="sign-up-form">
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
                    <TextField id="filled-basic"
                               className="input-field"
                               label={DICTIONARY.repeatPassword}
                               variant="filled"
                               name="repeatPassword"
                               type="password"
                               value={user.repeatPassword}
                               onChange={onChangeUpdateUser}
                               required={true}/>

                    <Button text={DICTIONARY.signUp}
                            onClick={onClickHandleRegister}/>

                </div>

            </div>
        </div>
    );
}

