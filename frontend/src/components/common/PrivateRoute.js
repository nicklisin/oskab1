import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import {connect} from "react-redux";

const PrivateRoute = ({ component: Component, auth, ...rest}) => {
            if(auth.isLoading){
                return <h2>Загрузка...</h2>
            } else if(!auth.isAuthenticated){
                return <Navigate replace to="/login" />
            } else {
                return <Outlet {...rest} />
            }
}


const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)
