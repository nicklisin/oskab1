import React, {Component} from 'react';
import {Link, NavLink} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {logout} from "../../actions/auth";


class Header extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired,
        suppliers: PropTypes.array.isRequired,
        logout: PropTypes.func.isRequired
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const guestLinks = (
                        <ul className="navbar-nav ms-md-auto">
                            <li className="nav-item">
                                <Link to="/register" className="nav-link">Регистрация</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Вход</Link>
                            </li>
                        </ul>
        )

        const authLinks = (
                       <ul className="navbar-nav ms-md-auto">
                           <span title="userinfo" className="navbar-text me-2">
                               { user ? `👤 ${user.username} (${user.email})` : '' }
                           </span>
                            <li className="nav-item">
                               <button onClick={this.props.logout} className="nav-link btn btn-sm btn-info text-light ps-2 pe-2">
                                   <svg className="me-1" id="i-signin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3">
                                    <path d="M3 16 L23 16 M15 8 L23 16 15 24 M21 4 L29 4 29 28 21 28" />
                                    </svg> Выход</button>
                            </li>
                        </ul>
        )

        const offersLink = (
                           <li className="nav-item">
                                  <NavLink
                                  to='offers'
                                  className={({isActive}) =>
                                    "nav-link" + (isActive ? " active" : "")
                                  }
                                >
                                  Сделки
                                </NavLink>
                            </li>
        )

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <NavLink className="navbar-brand" to='/'>♼ <strong>ОСКАБ</strong></NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarColor03">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <NavLink to='/'
                                  className={({isActive}) =>
                                    "nav-link" + (isActive ? " active" : "")
                                  }
                                >
                                  Главная
                                </NavLink>
                            </li>

                            {this.props.suppliers.length ? offersLink : ''}

                            <li className="nav-item">
                                <NavLink to='/help'
                                  className={({isActive}) =>
                                    "nav-link" + (isActive ? " active" : "")
                                  }
                                >
                                  Справка
                                </NavLink>
                            </li>

                        </ul>
                        {isAuthenticated ? authLinks : guestLinks }
                    </div>

                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    suppliers: state.suppliers.suppliers
})

export default connect(mapStateToProps, {logout})(Header);
