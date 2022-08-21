import React from "react";
import { render } from '../../../../utils/test-utils';
import {screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import '@testing-library/user-event';

import Login from "./Login";
import {Router} from "react-router-dom";
import {createMemoryHistory} from 'history';

test('on initial render, the login button is disabled', async ()=>{
    const history = createMemoryHistory();
    render(
        <Router location={history.location} navigator={history}>
            <Login/>
        </Router>
    );
    expect(await screen.findByRole('button', {name: /войти/i})).toBeDisabled();
})

test('after input login and password, the login button is enabled', async ()=>{
    const history = createMemoryHistory();
    render(
        <Router location={history.location} navigator={history}>
            <Login/>
        </Router>
    );
    const username = screen.getByLabelText('Логин')
    const password = screen.getByLabelText('Пароль')
    await userEvent.type(username, 'aaa')
    expect(await screen.findByRole('button', {name: /войти/i})).toBeDisabled();
    await userEvent.type(password, 'bbb')
    expect(await screen.findByRole('button', {name: /войти/i})).not.toBeDisabled();
})
