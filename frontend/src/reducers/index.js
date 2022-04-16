import {combineReducers} from "redux";
import offers from './offers'
import suppliers from "./suppliers";
import errors from './errors'
import messages from "./messages";
import auth from "./auth";

export default combineReducers({
    offers,
    suppliers,
    errors,
    messages,
    auth
})
