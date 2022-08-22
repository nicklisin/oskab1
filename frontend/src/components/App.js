import React, {Component, Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes}  from 'react-router-dom'
import {Provider} from "react-redux";
import store from "../store";
import {Provider as AlertProvider} from '@blaumaus/react-alert';
import AlertTemplate from "react-alert-template-basic";

import Header from "./layout/Header";
import SuppliersDashboard from "./suppliers/SuppliersDashboard";
import OffersDashboard from "./offers/OffersDashboard";
import Legal from "./help/Legal";
import Help from "./help/Help";
import Alerts from "./layout/Alerts";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import PrivateRoute from "./common/PrivateRoute";
import {loadUser} from "../actions/auth";
import Forgot from "./accounts/Forgot";
import Reset from "./accounts/Reset";
import ErrorBoundary from "./common/ErrorBoundary";
import ReactGA from 'react-ga';

const alertOptions = {
    timeout: 3000,
    position: "top right"
}

class App extends Component {

    componentDidMount() {
        store.dispatch(loadUser())
        ReactGA.initialize('UA-000000-01')
    }

    render() {

        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                        <ErrorBoundary>
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
                                        <Route path="/forgot" element={<Forgot/>} />
                                        <Route path="/reset" element={<Reset/>} />
                                        <Route path="/help" element={<Help/>} />
                                        <Route path="/help/legal" element={<Legal/>} />
                                    </Routes>
                                </div>
                            </Fragment>
                        </ErrorBoundary>
                    </Router>
                </AlertProvider>
            </Provider>
        );
    }
}

export default App;
