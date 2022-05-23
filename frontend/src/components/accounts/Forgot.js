import React, {Component} from "react";
import {Link, Navigate} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {forgot} from "../../actions/auth";


class Forgot extends Component {

    state = {
        email: ''
    }

    static propTypes = {
        forgot: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        isSending: PropTypes.bool,
        isSended: PropTypes.bool
    }

    onSubmit = e => {
        e.preventDefault()
        this.props.forgot(this.state.email)
    }

    onChange = e => this.setState({[e.target.name]: e.target.value})

    render() {
        if(this.props.isAuthenticated){
            return <Navigate to="/" />
        }
        const {email} = this.state;
        return (
            <div className="col-md-6 m-auto login-card">
                <div className="card card-body mt-5">
                    <h2 className="text-center">Забыли пароль?</h2>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Адрес электронной почты</label>
                            <input type="email"
                                   disabled={ this.props.isSending }
                                   className="form-control"
                                   name="email"
                                   onChange={this.onChange}
                                   value={email}
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" disabled={ this.props.isSending } className="btn btn-primary mt-2 mb-4">
                                { this.props.isSending ? <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span> : '' }
                                { this.props.isSending ? ' Отправляем' : 'Восстановить' }
                            </button>
                        </div>
                        { this.props.isSended ? <div className="alert alert-success">Ссылка для смены пароля была отправлена на { email }</div> : '' }
                    </form>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isSending: state.auth.isSending,
    isSended: state.auth.isSended
})

export default connect(mapStateToProps,{forgot})(Forgot);
