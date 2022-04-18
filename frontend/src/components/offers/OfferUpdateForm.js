import React, {Component} from 'react';
import {connect} from "react-redux";
import {getSuppliers} from "../../actions/suppliers";
import {getCategories} from "../../actions/offers";
import {updateOffer} from "../../actions/offers";
import PropTypes from "prop-types";

class OfferUpdateForm extends Component {

    componentDidMount() {
        this.props.getSuppliers();
        this.props.getCategories();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.offer !== this.props.offer){
            this.setState({
                ...this.props.offer
            })
        }
    }

    state = {
        id: '',
        category: 1,
        weight: '',
        impurity: '',
        price: '',
        delivery_method: 'removal',
        removal_address: '',
        delivery_range_from: '',
        delivery_range_max: '',
        delivery_range_price: '',
        supplier: this.props.suppliers[0].id,
        created: '',
        owner: '',
        status: '',
        updated: ''
        }

    static propTypes = {
        suppliers: PropTypes.array.isRequired,
        updateOffer: PropTypes.func.isRequired,
        getSuppliers: PropTypes.func.isRequired,
        getCategories: PropTypes.func.isRequired
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }
    onSubmit = e => {
        e.preventDefault();
        const { id, category, weight, impurity, price, delivery_method,
            removal_address, delivery_range_from, delivery_range_max,
            delivery_range_price, supplier, created, owner, status, updated} = this.state;
        const offer = { id, category, weight, impurity, price, delivery_method,
            removal_address, delivery_range_from, delivery_range_max,
            delivery_range_price, supplier, created, owner, status }
        this.props.updateOffer(id, offer)

        const delay = (ms) => {
            return new Promise((r) => setTimeout(() => r(), ms))
        }

        function updateOfferAsync() {
            return delay(200)
        }

        updateOfferAsync().then(()=>{
            // Clear form
            if(!this.props.errors.msg){
                this.setState({
                    id: '',
                    category: 1,
                    weight: '',
                    impurity: '',
                    price: '',
                    delivery_method: 'removal',
                    removal_address: '',
                    delivery_range_from: '',
                    delivery_range_max: '',
                    delivery_range_price: '',
                    supplier: this.props.suppliers[0].id,
                    created: '',
                    owner: '',
                    status: '',
                    updated: ''
                    })
                this.props.handleShowUpdateForm()
            }
        })

    }

    render() {
        const {category, weight, impurity, price, delivery_method,
            removal_address, delivery_range_from, delivery_range_max,
            delivery_range_price, supplier, status} = this.state;

        return (
            <div id="updateFormModal1" className="modal fade show d-block" tabIndex="-1" role="dialog" aria-hidden="true" aria-labelledby="updateFormModalLabel1">
                    <div className="modal-dialog modal-fullscreen" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="updateFormModalLabel1">Редактировать предложение</h5>
                                <button onClick={this.props.handleShowUpdateForm} type="button" className="btn-close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true"></span>
                                </button>
                            </div>
                            <div className="modal-body">

            <div className="card card-body mt-4 mb-4">
                <form onSubmit={this.onSubmit}>
                    <div className="row mb-2">
                        <div className="form-group col-md-6 mb-2">
                            <label>Категория</label>
                            <select className="form-select"
                            type="text"
                            name="category"
                            onChange={this.onChange}
                            value={category}
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
                    </div>
                    <div className="row">
                        <div className="form-group col-md-2 mb-2">
                            <label>Способ поставки</label>
                            <select className="form-select"
                            type="text"
                            name="delivery_method"
                            value={delivery_method}
                            onChange={this.onChange}
                            >
                                <option key='0' value='removal'>Вывоз</option>
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

                    <div className="row">
                        <div className="form-group col-md-2 mb-2">
                            <label>Статус</label>
                            <select className="form-select"
                            type="text"
                            name="status"
                            value={status}
                            onChange={this.onChange}
                            >
                                <option key='0' value='draft'>Черновик</option>
                                <option key='1' value='sended'>К отправке</option>
                            </select>
                        </div>
                    </div>

                    <button className="btn btn-primary mt-4 me-2" type="submit" data-dismiss="modal">{status == 'sended'? 'Отправить на проверку' : 'Сохранить'}</button>
                    <button onClick={this.props.handleShowUpdateForm} className="btn btn-secondary mt-4" type="button" data-dismiss="modal">Отменить</button>
                </form>
            </div>

                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

const mapStateToProps = state => ({
    suppliers: state.suppliers.suppliers,
    categories: state.offers.categories,
    errors: state.errors,
    offer: state.offers.offer
})

export default connect(mapStateToProps, {getCategories, updateOffer, getSuppliers})(OfferUpdateForm);
