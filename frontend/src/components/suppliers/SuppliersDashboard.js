import React, {Fragment} from 'react';
import Form from "./Form";
import Suppliers from "./Suppliers";

export default function SuppliersDashboard() {
        return (
            <Fragment>
                <Suppliers/>
                <Form/>
            </Fragment>
        );
}
