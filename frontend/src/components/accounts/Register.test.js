import React from "react";
import { render } from '../../../../utils/test-utils';
import {screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import '@testing-library/user-event';

import Register from "./Register";
import {Router} from "react-router-dom";
import {createMemoryHistory} from 'history';

test('on initial render, the register button is disabled', async ()=>{
    const history = createMemoryHistory();
    render(
        <Router location={history.location} navigator={history}>
            <Register/>
        </Router>
    );
    expect(await screen.findByRole('button', {name: /зарегистрироваться/i})).toBeDisabled();
})

test('after input all fields, the register button is enabled', async ()=>{
    const history = createMemoryHistory();
    render(
        <Router location={history.location} navigator={history}>
            <Register/>
        </Router>
    );
    const username = screen.getByLabelText('Логин')
    const email = screen.getByLabelText('Email')
    const password = screen.getByLabelText('Пароль')
    const password2 = screen.getByLabelText('Подтвердите пароль')
    await userEvent.type(username, 'aaa')
    await userEvent.type(email, 'email@gmail.com')
    await userEvent.type(password, 'bbb')
    await userEvent.type(password2, 'bbb')

    expect(await screen.findByRole('button', {name: /зарегистрироваться/i})).toBeEnabled();
})
