import React, {useState} from 'react';
import './SignUpPage.less'
import Header from "./Header.jsx";
import {useDictionary} from "../../config/dictionary.jsx";
import TextField from "@material-ui/core/TextField";
import {ObjectState} from "../../utils/utils.jsx";
import Button from "../common/Button.jsx";
import {toast} from "react-toastify";
import {useHistory} from "react-router-dom";
import {API} from "../../config/axiosConfig.jsx";

export default HomePage;

function HomePage() {
    const {DICTIONARY} = useDictionary();
    const history = useHistory();

    const [{data: signUpData, loading: signUpLoading, error: signUpError}, executeSignUp] = API.useAuthenticationServiceAxios(
        {
            url: "/api/user",
            method: 'POST'
        },
        {manual: true}
    )

    const [user, setUser] = useState({
        email: "",
        password: "",
        repeatPassword: ""
    });

    const onChangeUpdateUser = (event) => {
        ObjectState.update(setUser, event.target.name, event.target.value)
    }

    function handleSignUpRequestError(ex) {
        const response = ex.response;
        switch (response.status) {
            case 500:
                toast.error(DICTIONARY.pleaseTryAgainLater)
                break;
            case 400:
                if ("EMAIL_TAKEN" === response.data.errorCode)
                    toast.error(DICTIONARY.emailIsAlreadyInUse);
                else
                    toast.error(DICTIONARY.checkYourInput)
                break;
            default:
                toast.error(DICTIONARY.somethingBadHappenedPleaseTryAgainLater)
                break;
        }
    }

    const onClickHandleRegister = async () => {

        try {
            validate()
        } catch (ex) {
            toast.error(ex.message)
            return;
        }

        try {
            const signUpRequest = {
                email: user.email,
                password: user.password,
                userType: "BASIC"
            };
            await executeSignUp({...signUpData, data: signUpRequest});
            history.push("/login");
        } catch (ex) {
            handleSignUpRequestError(ex);
        }
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
                            onClick={onClickHandleRegister}
                            isLoading={signUpLoading}/>

                </div>

            </div>
        </div>
    );
}

