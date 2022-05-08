import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Routes, Redirect, Switch}  from 'react-router-dom'
import {Provider} from "react-redux";
import store from "../store";
import {Provider as AlertProvider} from 'react-alert';
import AlertTemplate from "react-alert-template-basic";

import Header from "./layout/Header";
import SuppliersDashboard from "./suppliers/SuppliersDashboard";
import OffersDashboard from "./offers/OffersDashboard";
import Legal from "./help/Legal";
import Alerts from "./layout/Alerts";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import PrivateRoute from "./common/PrivateRoute";
import {loadUser} from "../actions/auth";


//Alert options
const alertOptions = {
    timeout: 3000,
    position: "top right"
}


class App extends Component {

    componentDidMount() {
        store.dispatch(loadUser())
    }

    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                        <Fragment>
                            <Header />
                            <Alerts />
                            <div className="container mt-4">
                                <Routes>
                                    <Route path="/" element={<PrivateRoute/>}>
                                        <Route path="/" element={<SuppliersDashboard/>} />
                                        <Route path="/offers" element={<OffersDashboard/>} />
                                    </Route>
                                    <Route path="/register" element={<Register/>} />
                                    <Route path="/login" element={<Login/>} />
                                    <Route path="/legal" element={<Legal/>} />
                                </Routes>
                            </div>
                        </Fragment>
                    </Router>
                </AlertProvider>
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'))
