import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals.js';
import {withStore} from "react-context-hook";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const AppWithStore = withStore(App);

ReactDOM.render(
    <React.StrictMode>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <AppWithStore/>
        </MuiPickersUtilsProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
