import React from 'react'
import { screen } from "@testing-library/react"
import { renderWithProviders } from "./utils/test-utils"

import FinancialStatement from "./FinancialStatement"
import { FinancialType } from "./Financials";

test("renders four InOutBoxes (income, expense, asset, liability", () => {
    renderWithProviders(<FinancialStatement />)

    expect(screen.queryByText(FinancialType.INCOME, { selector: "span.InOutBox-title" })).toBeInTheDocument();
    expect(screen.queryByText(FinancialType.EXPENSE, { selector: "span.InOutBox-title" })).toBeInTheDocument();
    expect(screen.queryByText(FinancialType.ASSET, { selector: "span.InOutBox-title" })).toBeInTheDocument();
    expect(screen.queryByText(FinancialType.LIABILITY, { selector: "span.InOutBox-title" })).toBeInTheDocument();
})