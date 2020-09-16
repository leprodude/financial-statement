import React from 'react'
import { screen, fireEvent } from "@testing-library/react"
import { renderWithProviders } from "./utils/test-utils"
import { Router } from "react-router-dom"
import { createMemoryHistory } from "history"

import App from "./App"

test("full app rendering / navigating", () => {
    const history = createMemoryHistory();
    renderWithProviders(
        <Router history={history}>
            <App />
        </Router>
    )

    // verify nav links exist and correct one is active
    expect(screen.getByRole("link", { name: /financial statement/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /financial statement/i })).toHaveClass("active");
    expect(screen.getByRole("link", { name: /cashflow patterns/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /cashflow patterns/i })).not.toHaveClass("active");

    // verify correct page content
    expect(screen.getByText("income", { selector: "span.InOutBox-title" })).toBeInTheDocument();
    expect(screen.getByText("expense", { selector: "span.InOutBox-title" })).toBeInTheDocument();
    expect(screen.getByText("asset", { selector: "span.InOutBox-title" })).toBeInTheDocument();
    expect(screen.getByText("liability", { selector: "span.InOutBox-title" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /poor/i })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("link", { name: /patterns/i }));

    // verify content changed to new page
    expect(screen.getByRole("button", { name: /poor/i })).toBeInTheDocument();
    expect(screen.queryByText("income", { selector: "span.InOutBox-title" })).not.toBeInTheDocument();
})

test("requesting a bad url shows error message", () => {
    const history = createMemoryHistory();
    history.push("/abceasyas123");
    renderWithProviders(
        <Router history={history}>
            <App />
        </Router>
    )
    expect(screen.getByRole("heading")).toHaveTextContent("You have found a way out!");
})