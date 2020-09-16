import React from 'react'
import { FinancialsContext, DispatchContext } from "./contexts/FinancialsContext";
import { FormContext } from "./contexts/FormContext";
import { render, screen, fireEvent } from "@testing-library/react"
import { renderWithProviders } from "./utils/test-utils"

import InOutBox from "./InOutBox"
import { FinancialType } from "./Financials"
import InitialFinancials from "./InitialFinancials"

test("renders box title tag", () => {
    renderWithProviders(<InOutBox financialType={FinancialType.INCOME} />)

    expect(screen.queryByText(FinancialType.INCOME)).toBeInTheDocument()
    expect(screen.queryByText(FinancialType.EXPENSE)).not.toBeInTheDocument()

    expect(screen.queryByText("6950")).toBeInTheDocument()
})

test("renders box cashflow sum if present", () => {
    const { rerender } = renderWithProviders(<InOutBox financialType={FinancialType.INCOME} />)
    expect(screen.queryByText("6950")).toBeInTheDocument()

    rerender(<InOutBox financialType={FinancialType.LIABILITY} />)
    expect(screen.queryByTestId("InOutBox-sum")).toBeInTheDocument()
    expect(screen.queryByTestId("InOutBox-sum")).toHaveClass("tag is-danger")
})

test("renders correct number of table body rows (INCOME)", () => {
    renderWithProviders(<InOutBox financialType={FinancialType.INCOME} />)

    InitialFinancials[FinancialType.INCOME].forEach(el => {
        expect(screen.queryByText(el.name)).toBeInTheDocument()
    });
    InitialFinancials[FinancialType.ASSET].forEach(el => {
        expect(screen.queryByText(el.name)).toBeInTheDocument()
    });
})

test("renders correct number of table body rows (ASSET)", () => {
    renderWithProviders(<InOutBox financialType={FinancialType.ASSET} />)

    InitialFinancials[FinancialType.ASSET].forEach(el => {
        expect(screen.queryByText(el.name)).toBeInTheDocument()
    });
})

test("fires click event on table body row", () => {
    // const providerProps = {
    // }
    
    const financials = InitialFinancials;
    const dispatch = jest.fn();
    const showModal = false;
    const toggleShowModal = jest.fn();
    const entry = undefined;
    const setEntry = jest.fn();
    const isEditing = false;
    const setIsEditing = jest.fn();

    render(
        <FinancialsContext.Provider value={financials}>
            <DispatchContext.Provider value={dispatch}>
                <FormContext.Provider
                    value={{ showModal, toggleShowModal, entry, setEntry, isEditing, setIsEditing }}
                >
                    <InOutBox financialType={FinancialType.INCOME} />
                </FormContext.Provider>
            </DispatchContext.Provider>
        // </FinancialsContext.Provider>
    )

    const firstEntry = screen.getByText(financials[FinancialType.INCOME]![0].name)
    const firstPassiveIncomeEntry = screen.getByText(financials[FinancialType.ASSET]![0].name)

    fireEvent.click(firstEntry);
    expect(setEntry).toHaveBeenLastCalledWith(financials[FinancialType.INCOME]![0]);
    expect(setIsEditing).toHaveBeenLastCalledWith(true);
    
    fireEvent.click(firstPassiveIncomeEntry);
    expect(setEntry).toHaveBeenLastCalledWith(financials[FinancialType.ASSET]![0]);
    expect(setIsEditing).toHaveBeenLastCalledWith(true);
    
    expect(setEntry).toHaveBeenCalledTimes(2);
    expect(setIsEditing).toHaveBeenCalledTimes(2);
    expect(toggleShowModal).toHaveBeenCalledTimes(2);
})

test("fires click event on plus sign", () => {
    const financials = InitialFinancials;
    const dispatch = jest.fn();
    const toggleShowModal = jest.fn();
    const setEntry = jest.fn();

    render(
        <FinancialsContext.Provider value={financials}>
            <DispatchContext.Provider value={dispatch}>
                <FormContext.Provider
                    value={{ toggleShowModal, setEntry }}
                >
                    <InOutBox financialType={FinancialType.INCOME} />
                </FormContext.Provider>
             </DispatchContext.Provider>
         </FinancialsContext.Provider>
    )

    const plusSign = screen.getByTestId("add entry")

    fireEvent.click(plusSign);
    expect(setEntry).toHaveBeenCalledTimes(1);
    expect(setEntry).toHaveBeenLastCalledWith({ _id: expect.any(String), _type: "income", name: "", cashflow: 0});
    expect(toggleShowModal).toHaveBeenCalledTimes(1);
})