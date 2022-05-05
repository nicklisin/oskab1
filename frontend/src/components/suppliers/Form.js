import React, {Component} from 'react';
import {connect} from "react-redux";
import {addSupplier, getSuppliers} from "../../actions/suppliers";
import PropTypes from "prop-types";

class Form extends Component {

    state = {
        inn: '',
        name: '',
        address: '',
        status: '',
        license: ''
    }

    static propTypes = {
        suppliers: PropTypes.array.isRequired,
        addSupplier: PropTypes.func.isRequired,
        getSuppliers: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getSuppliers();
    }

    onChange = e => this.setState({[e.target.name]: e.target.value})
    onSubmit = e => {
        e.preventDefault();
        const { inn, name, address, license } = this.state;
        const supplier = { inn, name, address, license }
        this.props.addSupplier(supplier);

        const delay = (ms) => {
            return new Promise((r) => setTimeout(() => r(), ms))
        }

        function addSupplierAsync() {
            return delay(200)
        }

        addSupplierAsync().then(()=>{
            // Clear form
            if(!this.props.errors.msg){
                this.setState({
                    inn: '',
                    name: '',
                    address: '',
                    status: '',
                    license: ''
                })
            }
        })
    }


    render() {
        const {inn, name, address, license} = this.state;

        if (this.props.suppliers.length === 0){
            return (
            <div className="card card-body mt-4 mb-4 col-lg-6">
                <h2>Добавить компанию</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>ИНН</label>
                        <input className="form-control"
                        type="text"
                        name="inn"
                        onChange={this.onChange}
                        value={inn}
                        minLength="10"
                        maxLength="12"
                        />
                    </div>
                    <div className="form-group">
                        <label>Название</label>
                        <input className="form-control"
                        type="text"
                        name="name"
                        onChange={this.onChange}
                        value={name}
                        />
                    </div>
                    <div className="form-group">
                        <label>Адрес</label>
                        <input className="form-control"
                        type="text"
                        name="address"
                        onChange={this.onChange}
                        value={address}
                        />
                    </div>
                    <div className="form-group">
                        <label>Лицензия</label>
                        <input className="form-control"
                        type="text"
                        name="license"
                        onChange={this.onChange}
                        value={license}
                        />
                    </div>
                    <button className="btn btn-primary mt-4" type="submit">Отправить</button>
                </form>
            </div>
        );
        } else {
            return <div></div>
        }

    }
}

const mapStateToProps = state => ({
    suppliers: state.suppliers.suppliers
})

export default connect(mapStateToProps, {addSupplier, getSuppliers})(Form);
