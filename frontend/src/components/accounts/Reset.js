import React, {Component} from "react";
import {Link, Navigate} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {reset} from "../../actions/auth";


class Reset extends Component {

    state = {
        password: '',
        password2: '',
        token: ''
    }

    static propTypes = {
        reset: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        isPassChanging: PropTypes.bool,
        isPassChanged: PropTypes.bool
    }

    onSubmit = e => {
        e.preventDefault()
        const windowUrl = window.location.href;
        const token = windowUrl.split('?token=')[1]
        this.props.reset(this.state.password, token)
        this.setState({
            password: '',
            password2: '',
            token: ''
            })
    }

    onChange = e => this.setState({[e.target.name]: e.target.value})

    render() {
        if(this.props.isAuthenticated){
            return <Navigate to="/" />
        }
        const {password, password2} = this.state;
        return (
            <div className="col-md-6 m-auto login-card">
                <div className="card card-body mt-5">
                    <h2 className="text-center">Смена пароля</h2>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Введите новый пароль</label>
                            <input type="password"
                                   disabled={ this.props.isSending }
                                   className="form-control"
                                   name="password"
                                   onChange={this.onChange}
                                   value={password}
                            />
                            <label>Повторите пароль</label>
                            <input type="password"
                                   disabled={ this.props.isPassChanging }
                                   className="form-control"
                                   name="password2"
                                   onChange={this.onChange}
                                   value={password2}
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" disabled={ this.props.isPassChanging } className="btn btn-primary mt-2 mb-4">
                                { this.props.isPassChanging ? <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span> : '' }
                                { this.props.isPassChanging ? ' Меняем' : 'Сменить пароль' }
                            </button>
                        </div>
                        { this.props.isPassChanged ? <div className="alert alert-success">Пароль успешно изменен! <Link to="/login">Войти</Link>.</div> : '' }
                    </form>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isPassChanging: state.auth.isPassChanging,
    isPassChanged: state.auth.isPassChanged
})

export default connect(mapStateToProps,{reset})(Reset);
