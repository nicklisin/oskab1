import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getSuppliers, deleteSupplier} from "../../actions/suppliers";

export class Suppliers extends Component {
    static propTypes = {
        suppliers: PropTypes.array.isRequired,
        getSuppliers: PropTypes.func.isRequired,
        deleteSupplier: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.getSuppliers();
    }

    render() {
        return (
            <div>
                <h1>Компании</h1>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>ИНН</th>
                        <th>Название</th>
                        <th>Адрес</th>
                        <th>Статус</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.suppliers.map(supplier => (
                        <tr key={supplier.id}>
                            <td>{supplier.inn}</td>
                            <td>{supplier.name}</td>
                            <td>{supplier.address}</td>
                            <td>{supplier.status_name}</td>
                            <td><button onClick={this.props.deleteSupplier.bind(this, supplier.id)} className="btn btn-sm btn-danger">Удалить</button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    suppliers: state.suppliers.suppliers
})

export default connect(mapStateToProps, { getSuppliers, deleteSupplier })(Suppliers);
