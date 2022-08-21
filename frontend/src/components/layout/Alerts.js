import React, {Component, Fragment} from 'react';
import {withAlert} from "@blaumaus/react-alert";
import {connect} from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {

    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    }

    componentDidUpdate(prevProps) {
        const {error, alert, message} = this.props;
        if(error !== prevProps.error){
            if(error.msg.inn){ alert.error(`ИНН: ${error.msg.name.join()}`)}
            if(error.msg.name){alert.error(`Название: ${error.msg.name.join()}`)}
            if(error.msg.address){alert.error(`Адрес: ${error.msg.address.join()}`)}
            if(error.msg.license){alert.error(`Лицензия: ${error.msg.license.join()}`)}
            if(error.msg.non_field_errors){alert.error('Неверный логин и/или пароль!')}
            if(error.msg.username){alert.error(`Логин: ${error.msg.username.join()}`)}
            if(error.msg.email){
                if(error.msg.email[0] === "We couldn\'t find an account associated with that email. Please try a different e-mail address."){
                    alert.error('Мы не смогли найти аккаунт, связанный с этой почтой. Попробуйте другой адрес.')
                } else {alert.error(`Email: ${error.msg.email.join()}`)}
            }
            if(error.msg.password){alert.error(`Пароль: ${error.msg.password.join()}`)}
            if(error.msg.delivery_range_from){alert.error(`Адрес отправления: ${error.msg.delivery_range_from.join()}`)}
            if(error.msg.delivery_range_max){alert.error(`Макс. расстояние доставки: ${error.msg.delivery_range_max.join()}`)}
            if(error.msg.delivery_range_price){alert.error(`Цена доставки (за 1 км): ${error.msg.delivery_range_price.join()}`)}
            if(error.msg.impurity){alert.error(`Засор: ${error.msg.impurity.join()}`)}
            if(error.msg.price){alert.error(`Цена: ${error.msg.price.join()}`)}
            if(error.msg.determent){alert.error(`Отсрочка платежа: ${error.msg.determent.join()}`)}
            if(error.msg.delivery_date){alert.error(`Дата поставки: ${error.msg.delivery_date.join()}`)}
            if(error.msg.removal_address){alert.error(`Адрес вывоза: ${error.msg.removal_address.join()}`)}
            if(error.msg.weight){alert.error(`Вес: ${error.msg.weight.join()}`)}
        }
        if(message !== prevProps.message){
            if(message.deleteSupplier){alert.success(message.deleteSupplier)}
            if(message.addSupplier){alert.success(message.addSupplier)}
            if(message.addOffer){alert.success(message.addOffer)}
            if(message.deleteOffer){alert.success(message.deleteOffer)}
            if(message.addOfferFail){alert.error(message.addOfferFail)}
            if(message.passwordsNotMatch){alert.error(message.passwordsNotMatch)}
        }
    }

    render() {
        return <Fragment />;
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages
})

export default connect(mapStateToProps)(withAlert()(Alerts));
