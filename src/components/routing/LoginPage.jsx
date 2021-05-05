import React, {useState} from 'react';
import './LoginPage.less'
import Header from "./Header.jsx";
import {useDictionary} from "../../config/dictionary.jsx";
import TextField from "@material-ui/core/TextField";
import {ObjectState} from "../../utils/utils.jsx";
import Button from "../common/Button.jsx";
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import {API} from "../../config/axiosConfig.jsx";
import {useStore} from "react-context-hook";
import jwt_decode from "jwt-decode";

export default HomePage;

function HomePage() {
    const {DICTIONARY} = useDictionary();
    const history = useHistory();
    const [storedUser, setStoredUser] = useStore('user')

    const [{data: signUpData, loading: signUpLoading, error: signUpError}, executeSignUp] = API.useAuthenticationServiceAxios(
        {
            url: "/api/user/token",
            method: 'POST'
        },
        {manual: true}
    )

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const onChangeUpdateUser = (event) => {
        ObjectState.update(setUser, event.target.name, event.target.value)
    }

    const handleLoginRequestError = (ex) => {
        const response = ex.response ? ex.response : 666;
        switch (response.status) {
            case 500:
                toast.error(DICTIONARY.pleaseTryAgainLater)
                break;
            case 404:
                toast.error(DICTIONARY.userDoesNotExist)
                break;
            case 400:
                if ("INCORRECT_PASSWORD" === response.data.errorCode)
                    toast.error(DICTIONARY.incorrectPassword);
                else
                    toast.error(DICTIONARY.checkYourInput)
                break;
            default:
                toast.error(DICTIONARY.somethingBadHappenedPleaseTryAgainLater)
                break;
        }
    }

    const onClickHandleLogin = async () => {
        try {
            const loginRequest = {
                email: user.email,
                password: user.password
            }
            const loginResponse = await executeSignUp({...signUpData, data: loginRequest});
            const token = loginResponse.data.token;
            const decodedUser = jwt_decode(token)
            setStoredUser({
                userId: decodedUser.userId,
                userType: decodedUser.userType
            })
            localStorage.setItem("token", token);
            history.push("/")
        } catch (ex) {
            handleLoginRequestError(ex)
        }
    }

    const onClickHandleRegister = () => {
        history.push("/signup")
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
                            onClick={onClickHandleLogin}
                            isLoading={signUpLoading}/>

                </div>
            </div>
        </div>
    );
}

