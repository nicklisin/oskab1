import React, {Component} from 'react';
import {Link, Navigate} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {register} from "../../actions/auth";
import {createMessage} from "../../actions/messages";

class Register extends Component {

    state = {
        username: '',
        email: '',
        password: '',
        password2: ''
    }

    static propTypes = {
        register: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }

    onSubmit = e => {
        e.preventDefault()
        const {username, email, password, password2} = this.state
        if(password !== password2){
            this.props.createMessage({ passwordsNotMatch: 'Пароли не совпадают!' })
        } else {
            const newUser = {
                username,
                email,
                password
            }
            this.props.register(newUser);
        }
    }

    onChange = e => this.setState({[e.target.name]: e.target.value})

    render() {

        const emailCheck = /\S+@\S+\.\S+/;

        function passCheck(pass1, pass2){
            return pass1 === pass2 && (pass1.length >= 3)
        }

        if(this.props.isAuthenticated){
            return <Navigate to="/"/>
        }
        const {username, email, password, password2} = this.state;
        return (
            <div className="col-md-6 m-auto reg-card">
                <div className="card card-body mt-5">
                    <h2 className="text-center">Регистрация</h2>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Логин</label>
                            <input type="text"
                                   id="username"
                                   className="form-control"
                                   name="username"
                                   onChange={this.onChange}
                                   value={username}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email"
                                   id="email"
                                   className={emailCheck.test(email) ? 'form-control is-valid': 'form-control'}
                                   name="email"
                                   onChange={this.onChange}
                                   value={email}
                            />
                            <div className="bd-callout bd-callout-warning">Указывайте действующий адрес почты, на него будут приходить уведомления.</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Пароль</label>
                            <input type="password"
                                   id="password"
                                   className={passCheck(password, password2) ? "form-control is-valid" : "form-control" }
                                   name="password"
                                   onChange={this.onChange}
                                   value={password}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password2">Подтвердите пароль</label>
                            <input type="password"
                                   id="password2"
                                   className={passCheck(password, password2) ? "form-control is-valid" : "form-control" }
                                   name="password2"
                                   onChange={this.onChange}
                                   value={password2}
                            />
                        </div>
                        <div className="form-group">
                            <button disabled={!username.length || !emailCheck.test(email) || !password.length || !password2.length || !(password === password2)} type="submit" className="btn btn-primary mt-2 mb-4">Зарегистрироваться</button>
                        </div>
                        <p>Уже есть аккаунт? <Link to="/login">Войти</Link></p>
                    </form>
                </div>
                
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {register, createMessage})(Register);

