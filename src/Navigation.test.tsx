import React from 'react';
import { Router } from "react-router-dom"
import { createMemoryHistory } from "history"
import { render, screen } from '@testing-library/react';

import Navigation from './Navigation';
import userEvent from '@testing-library/user-event';

test('renders menu items', () => {
    const history = createMemoryHistory();
    render(
        <Router history={history}>
            <Navigation />
        </Router>
    )

    expect(screen.getByText("Financial Statement")).toHaveAttribute("href", "/");
    expect(screen.getByText("Cashflow Patterns")).toHaveAttribute("href", "/patterns");
});

test('shows burger menu on mobile', () => {
    const history = createMemoryHistory();
    render(
        <Router history={history}>
            <Navigation />
        </Router>
    )

    let button = screen.getByTestId("burger-button");
    let menu = screen.getByTestId("navbar");

    expect(button).not.toHaveClass("is-active");
    expect(menu).not.toHaveClass("is-active");

    userEvent.click(button);
    
    expect(button).toHaveClass("is-active");
    expect(menu).toHaveClass("is-active");
});
