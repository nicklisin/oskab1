import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getOffers, getOffer, deleteOffer} from "../../actions/offers";
import OfferUpdateForm from "./OfferUpdateForm";
import Form from "./Form";

export class Offers extends Component {

    state = {
        showAddForm: false,
        showUpdateForm: false,
        currentPage: 1
    }

    static propTypes = {
        offers: PropTypes.object.isRequired,
        getOffers: PropTypes.func.isRequired,
        getOffer: PropTypes.func.isRequired,
        deleteOffer: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        count: PropTypes.number,
    }

    componentDidMount() {
        this.props.getOffers(this.state.currentPage);
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
            this.setState(() => {
                return {
                    offer: this.props.getOffer(id)
                }
            })
            this.handleShowUpdateForm()
        }

    paginate = (e, val) => {
        e.preventDefault();
        this.setState({ currentPage: val})
        this.props.getOffers(val);
    }

    changePage = (e,val) => {
        e.preventDefault();
        const num = (val === 'next') ? 1 : -1;
        this.setState({ currentPage: this.state.currentPage+num})
        this.props.getOffers(this.state.currentPage+num);
    }

    getStatusColor(status) {
    if (status === 'accepted' || status === 'done') {
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

        const loader = <div className="loader w-100 h-500-px text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>

        return (
            <div>
                <h1 id="#topheader">Предложения</h1>

                <button onClick={ this.handleShowAddForm } type="button" className="btn btn-primary mt-4 small">+ Добавить предложение</button>

                {this.state.showAddForm ? <Form handleShowAddForm={this.handleShowAddForm} errors={this.state.errors} /> : null}
                {this.state.showUpdateForm ? <OfferUpdateForm handleShowUpdateForm={this.handleShowUpdateForm} errors={this.state.errors} offer={this.state.offer} /> : null}

                {this.props.isLoading ? loader :
                <div className="main-table table-responsive">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Статус</th>
                        <th>Изменено</th>
                        <th>Категория</th>
                        <th>Вес, кг</th>
                        <th>Засор, %</th>
                        <th>Цена, ₽/кг</th>
                        <th>Отсрочка, дней</th>
                        <th>Стоимость, ₽</th>
                        <th>Адрес</th>
                        <th>Способ поставки</th>
                        <th>Дата поставки</th>
                    </tr>
                    </thead>

                    <tbody>
                    {this.props.offers.offers.map(offer => (
                        <tr key={offer.id} className="main-table-row">
                            <td>
                                {offer.status === 'draft'
                                ? <button data-testid="edit-btn" type="button" className="btn btn-primary btn-sm me-1" data-offer-id={offer.id}
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
                            <td>{offer.determent}</td>
                            <td>{(offer.price * offer.weight).toFixed(2)}</td>
                            <td>{offer.removal_address}</td>
                            <td>{offer.delivery_method_name}</td>
                            <td><nobr>{offer.delivery_date}</nobr></td>
                            <td>
                                {offer.status === 'draft' || offer.status === 'todelete' ?
                                <button onClick={this.props.deleteOffer.bind(this, offer.id)} className="btn btn-sm btn-danger">×</button>
                                :''}
                            </td>
                        </tr>
                    ))}
                    </tbody>

                </table>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-end">
                            <li className={this.props.offers.previous ? 'page-item': 'page-item disabled'}><a onClick={ (e)=>{this.changePage(e,'prev')} } className="page-link" href="#">&laquo;</a></li>
                            {[...Array(Math.ceil(this.props.count/10)).fill(undefined).map((val, idx)=>idx+1)].map((val, index)=>(
                                <li key={index} className={this.state.currentPage === val ? 'page-item active': 'page-item'}>
                                    <a onClick={ (e) => {this.paginate(e, val)} } className="page-link" href="#">{val}</a>
                                </li>
                            )
                            )}
                            <li className={this.props.offers.next ? 'page-item': 'page-item disabled'}><a onClick={ (e)=>{this.changePage(e,'next')} } className="page-link" href="#">&raquo;</a></li>
                        </ul>
                    </nav>
                </div>
            }
            </div>

        );
    }
}

const mapStateToProps = state => ({
    offers: state.offers,
    count: state.offers.count,
    currentPage: state.offers.currentPage,
    offer: state.offers.offer,
    isLoading: state.offers.isLoading
})

export default connect(mapStateToProps, { getOffers, getOffer, deleteOffer })(Offers);
