import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getOffers, getOffer, deleteOffer} from "../../actions/offers";
import OfferUpdateForm from "./OfferUpdateForm";
import Form from "./Form";

export class Offers extends Component {

    state = {
        showAddForm: false,
        showUpdateForm: false
    }

    static propTypes = {
        offers: PropTypes.array.isRequired,
        getOffers: PropTypes.func.isRequired,
        getOffer: PropTypes.func.isRequired,
        deleteOffer: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.getOffers();
    }

    handleShowAddForm = () => {
        if (this.state.showAddForm) {
            this.setState({ showAddForm: false })
        } else {
            this.setState({ showAddForm: true })
            }
        }

    handleShowUpdateForm = () => {
        if (this.state.showUpdateForm) {
            this.setState({ showUpdateForm: false })
        } else {
            this.setState({ showUpdateForm: true })
            }
        }

    getOfferFunc = (e, id) => {
            this.setState((prevState) => {
                return {
                    offer: this.props.getOffer(id)
                }
            })
            this.handleShowUpdateForm()
        }

    getStatusColor(status) {
    if (status === 'accepted') {
        return 'text-success';
    }
    if (status === 'rejected' || status === 'todelete') {
        return 'text-danger';
    }
    if (status === 'onreview' || status === 'prerejected') {
        return 'text-info';
    }
    return '';
}

    render() {

        return (
            <div>
                <h1 id="#topheader">Предложения</h1>
                <button onClick={ this.handleShowAddForm } type="button" className="btn btn-primary mt-4 small">+ Добавить предложение</button>

                {this.state.showAddForm ? <Form handleShowAddForm={this.handleShowAddForm} errors={this.state.errors} /> : null}
                {this.state.showUpdateForm ? <OfferUpdateForm handleShowUpdateForm={this.handleShowUpdateForm} errors={this.state.errors} offer={this.state.offer} /> : null}


                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Статус</th>
                        <th>Дата</th>
                        {/*<th>Компания</th>*/}
                        <th>Категория</th>
                        <th>Вес, кг</th>
                        <th>Засор, %</th>
                        <th>Цена, руб.</th>
                        <th>Стоимость, руб.</th>
                        <th>Адрес</th>
                        <th>Способ поставки</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.offers.map(offer => (
                        <tr key={offer.id}>
                            <td>
                                {/*<button type="button" className="btn btn-primary" data-toggle="modal"*/}
                                {/*data-target="#updateFormModal" data-offer-id={offer.id}*/}
                                {/*onClick={ (e) => { this.getOfferFunc(e, offer.id) } } >*/}
                                {/*    Edit*/}
                                {/*</button>*/}
                                {offer.status === 'draft'
                                ? <button type="button" className="btn btn-primary btn-sm me-1" data-offer-id={offer.id}
                                onClick={ (e) => { this.getOfferFunc(e, offer.id) } } >
                                    <svg id="i-edit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                        <path d="M30 7 L25 2 5 22 3 29 10 27 Z M21 6 L26 11 Z M5 22 L10 27 Z" />
                                    </svg>
                                </button>
                                : '' }
                                <span className={this.getStatusColor(offer.status)}>{offer.status_name}</span>
                            </td>
                            {/*<td>{offer.supplier_name}</td>*/}
                            <td><nobr>{offer.updated.slice(8,10)}/{offer.updated.slice(5,7)}/{offer.updated.slice(0,4)}</nobr> <nobr>{offer.updated.slice(11,16)}</nobr></td>
                            <td>{offer.category_name}</td>
                            <td>{offer.weight}</td>
                            <td>{offer.impurity}</td>
                            <td>{offer.price}</td>
                            <td>{offer.price * offer.weight}</td>
                            <td>{offer.removal_address}</td>
                            <td>{offer.delivery_method_name}</td>
                            <td><button onClick={this.props.deleteOffer.bind(this, offer.id)} className="btn btn-sm btn-danger">×</button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    offers: state.offers.offers,
    offer: state.offers.offer
})

export default connect(mapStateToProps, { getOffers, getOffer, deleteOffer })(Offers);
