import React, {Component} from 'react';
import {connect} from "react-redux";
import {getSuppliers} from "../../actions/suppliers";
import {getCategories} from "../../actions/offers";
import {addOffer} from "../../actions/offers";
import PropTypes from "prop-types";

class Form extends Component {

    componentDidMount() {
        this.props.getSuppliers();
        this.props.getCategories();
    }

    state = {
        category: 1,
        weight: '',
        impurity: '',
        price: '',
        determent: 5,
        delivery_method: 'removal',
        removal_address: '',
        delivery_range_from: '',
        delivery_range_max: 0,
        delivery_range_price: 0,
        supplier: this.props.suppliers[0].id
        }

    static propTypes = {
        suppliers: PropTypes.array.isRequired,
        addOffer: PropTypes.func.isRequired,
        getSuppliers: PropTypes.func.isRequired,
        getCategories: PropTypes.func.isRequired
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }
    onSubmit = e => {
        e.preventDefault();
        const { category, weight, impurity, price, determent, delivery_method,
            removal_address, delivery_range_from, delivery_range_max,
            delivery_range_price, supplier } = this.state;
        const offer = { category, weight, impurity, price, determent, delivery_method,
            removal_address, delivery_range_from, delivery_range_max,
            delivery_range_price, supplier }
        this.props.addOffer(offer)

        const delay = (ms) => {
            return new Promise((r) => setTimeout(() => r(), ms))
        }

        function addOfferAsync() {
            return delay(200)
        }

        addOfferAsync().then(()=>{
            // Clear form
            if(!this.props.errors.msg){
                this.setState({
                    category: 1,
                    weight: '',
                    impurity: '',
                    price: '',
                    determent: 5,
                    delivery_method: 'removal',
                    removal_address: '',
                    delivery_range_from: '',
                    delivery_range_max: 0,
                    delivery_range_price: 0,
                    supplier: this.props.suppliers[0].id
                    })
                this.props.handleShowAddForm()
            }
        })


    }

    render() {
        const {category, weight, impurity, price, determent, delivery_method,
            removal_address, delivery_range_from, delivery_range_max,
            delivery_range_price, supplier} = this.state;

        return (
            <div className="card card-body mt-4 mb-4">
                <h2>Добавить предложение</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="row mb-2">
                        <div className="form-group col-md-6 mb-2">
                            <label>Категория</label>
                            <select className="form-select"
                            type="text"
                            name="category"
                            onChange={this.onChange}
                            >
                                { this.props.categories ? this.props.categories.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>)) : ''
                                }
                            </select>
                        </div>
                        <div className="form-group col-md-2 mb-2">
                            <label>Вес, кг</label>
                            <input className="form-control"
                            type="text"
                            name="weight"
                            onChange={this.onChange}
                            value={weight}
                            />
                        </div>
                        <div className="form-group col-md-2 mb-2">
                            <label>Засор, %</label>
                            <input className="form-control"
                            type="text"
                            name="impurity"
                            onChange={this.onChange}
                            value={impurity}
                            />
                        </div>
                        <div className="form-group col-md-2 mb-2">
                            <label>Цена, ₽/кг</label>
                            <input className="form-control"
                            type="number"
                            name="price"
                            onChange={this.onChange}
                            value={price}
                            />
                        </div>
                        <div className="form-group col-md-2 mb-2">
                            <label>Отсрочка, дней</label>
                            <input className="form-control"
                            type="number"
                            name="determent"
                            onChange={this.onChange}
                            value={determent}
                            />
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="form-group col-md-2 mb-2">
                        <label>Способ поставки</label>
                        <select className="form-select"
                        type="text"
                        name="delivery_method"
                        onChange={this.onChange}
                        >
                            <option key='0' value='removal'>Самовывоз</option>
                            <option key='1' value='delivery'>Доставка</option>
                        </select>
                    </div>
                    </div>
                    { delivery_method == 'removal' ?
                    <div className="row">
                        <div className="form-group col-md-6 mb-2">
                            <label>Адрес вывоза</label>
                            <input className="form-control"
                            type="text"
                            name="removal_address"
                            onChange={this.onChange}
                            value={removal_address}
                            />
                        </div>
                    </div>
                        : <div className="row">
                        <div className="form-group col-md-6 mb-2">
                            <label>Адрес отправления</label>
                            <input className="form-control"
                            type="text"
                            name="delivery_range_from"
                            onChange={this.onChange}
                            value={delivery_range_from}
                            />
                        </div>
                        <div className="form-group col-md-3 mb-2">
                            <label>Макс. расстояние доставки</label>
                            <input className="form-control"
                            type="text"
                            name="delivery_range_max"
                            onChange={this.onChange}
                            value={delivery_range_max}
                            />
                        </div>
                        <div className="form-group col-md-3 mb-2">
                            <label>Цена доставки (за 1 км)</label>
                            <input className="form-control"
                            type="text"
                            name="delivery_range_price"
                            onChange={this.onChange}
                            value={delivery_range_price}
                            />
                        </div>
                    </div>
                    }
                    <div className="form-group d-none">
                        <label>Поставщик</label>
                        <input className="form-control"
                        type="text"
                        name="supplier"
                        onChange={this.onChange}
                        value={supplier}
                        />
                    </div>

                    <button className="btn btn-primary mt-4 me-2" type="submit">Добавить</button>
                    <button onClick={this.props.handleShowAddForm} className="btn btn-secondary mt-4">Отменить</button>

                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    suppliers: state.suppliers.suppliers,
    categories: state.offers.categories,
    errors: state.errors
})

export default connect(mapStateToProps, {getCategories, addOffer, getSuppliers})(Form);
