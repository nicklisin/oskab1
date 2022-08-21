import React from "react";
import { render } from '../../../../utils/test-utils';
import {screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import '@testing-library/user-event';

import Forgot from "./Forgot";
import {Router} from "react-router-dom";
import {createMemoryHistory} from 'history';

test('on initial render, the restore button is disabled', async ()=>{
    const history = createMemoryHistory();
    render(
        <Router location={history.location} navigator={history}>
            <Forgot/>
        </Router>
    );
    expect(await screen.findByRole('button', {name: /восстановить/i})).toBeDisabled();
})

test('after input correct email, the restore button is enabled', async ()=>{
    const history = createMemoryHistory();
    render(
        <Router location={history.location} navigator={history}>
            <Forgot/>
        </Router>
    );
    const email = screen.getByLabelText('Адрес электронной почты')
    const button = await screen.findByRole('button', {name: /восстановить/i})

    await userEvent.type(email, 'mail')
    expect(button).toBeDisabled();
    await userEvent.type(email, '@')
    expect(button).toBeDisabled();
    await userEvent.type(email, 'email')
    expect(button).toBeDisabled();
    await userEvent.type(email, '.com')
    expect(button).toBeEnabled();
})
