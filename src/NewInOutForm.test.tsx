import React from 'react'
import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import InitialFinancials from "./InitialFinancials"
import { Financial } from './Financials'
import { FinancialsContext, DispatchContext } from "./contexts/FinancialsContext"
import { FormContext } from "./contexts/FormContext"

import NewInOutForm from "./NewInOutForm"

test("renders form when adding an entry", () => {
    const toggleShowModal = jest.fn();
    const setEntry = jest.fn();
    const setIsEditing = jest.fn();

    let entry = { _id: expect.any(String), _type: "income", name: "", cashflow: 0 } as Financial;
    let showModal = true;
    let isEditing = false;

    render(
        <FormContext.Provider value={{ showModal, toggleShowModal, entry, setEntry, isEditing, setIsEditing }}>
            <NewInOutForm reset={jest.fn()} />
        </FormContext.Provider>
    )

    expect(screen.getByText("Add income")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Cashflow")).toBeInTheDocument();
    expect(screen.queryByLabelText("Principal")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Interest")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Cost")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Downpay")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add income" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Remove income" })).not.toBeInTheDocument();
})

test("renders form correctly when editing a liability", () => {
    const toggleShowModal = jest.fn();
    const setEntry = jest.fn();
    const setIsEditing = jest.fn();

    let entry = { _id: expect.any(String), _type: "liability", name: "Big liability", cashflow: -300, principal: 1500, interest: 0.52 } as Financial;
    let showModal = true;
    let isEditing = true;

    render(
        <FormContext.Provider value={{ showModal, toggleShowModal, entry, setEntry, isEditing, setIsEditing }}>
            <NewInOutForm reset={jest.fn()} />
        </FormContext.Provider>
    )
    expect(screen.getByLabelText("Principal")).toHaveProperty("value", "1500");
    expect(screen.getByLabelText("Interest")).toHaveProperty("value", "0.52");

    let principal = screen.getByLabelText("Principal");
    let cashflow = screen.getByTestId("cashflow-generated");
    userEvent.type(principal, " ");
    expect(principal).toHaveProperty("value", " ");
    expect(cashflow).toHaveTextContent("0");

    userEvent.type(principal, "500");
    expect(cashflow).toHaveTextContent("-21.67");
})

test("renders form when editing an entry", () => {
    const toggleShowModal = jest.fn();
    const setEntry = jest.fn();
    const setIsEditing = jest.fn();

    let entry = { _id: expect.any(String), _type: "income", name: "My super income", cashflow: 14500 } as Financial;
    let showModal = true;
    let isEditing = true;

    render(
        <FormContext.Provider value={{ showModal, toggleShowModal, entry, setEntry, isEditing, setIsEditing }}>
            <NewInOutForm reset={jest.fn()} />
        </FormContext.Provider>
    )

    expect(screen.getByText("Edit income")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Cashflow")).toBeInTheDocument();
    expect(screen.getByLabelText("Cashflow")).toHaveProperty("value", "14500");
    expect(screen.getByRole("button", { name: "Edit income" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Remove income" })).toBeInTheDocument();
})

test("handles adding an entry", () => {
    const financials = InitialFinancials;
    const dispatch = jest.fn();
    const toggleShowModal = jest.fn();
    const setEntry = jest.fn();
    const setIsEditing = jest.fn();

    let entry = { _id: "test-id-whatever-string", _type: "income", name: "A wonderful income", cashflow: 5600 } as Financial;
    let showModal = true;
    let isEditing = false;

    const reset = jest.fn();

    render(
        <FinancialsContext.Provider value={financials}>
            <DispatchContext.Provider value={dispatch}>
                <FormContext.Provider value={{ showModal, toggleShowModal, entry, setEntry, isEditing, setIsEditing }}>
                    <NewInOutForm reset={reset} />
                </FormContext.Provider>
            </DispatchContext.Provider>
        </FinancialsContext.Provider>
    )

    userEvent.click(screen.getByRole("button", { name: "Add income" }));

    expect(setEntry).toHaveBeenCalledTimes(1);
    expect(setEntry).toHaveBeenLastCalledWith({ _id: expect.any(String), _type: "income", name: "A wonderful income", cashflow: 5600 });

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenLastCalledWith({ type: "ADD", financial: { _id: expect.any(String), _type: "income", name: "A wonderful income", cashflow: 5600 } });

    expect(toggleShowModal).toHaveBeenCalledTimes(1);
    expect(reset).toHaveBeenCalledTimes(1);
})

test("handles adding an asset", () => {
    const financials = InitialFinancials;
    const dispatch = jest.fn();
    const toggleShowModal = jest.fn();
    const setEntry = jest.fn();
    const setIsEditing = jest.fn();

    let entry = { _id: "test-id-any-string", _type: "asset", name: "Cool asset", cashflow: 5200, cost: 21000, downpay: 1000 } as Financial;
    let showModal = true;
    let isEditing = false;

    const reset = jest.fn();

    render(
        <FinancialsContext.Provider value={financials}>
            <DispatchContext.Provider value={dispatch}>
                <FormContext.Provider value={{ showModal, toggleShowModal, entry, setEntry, isEditing, setIsEditing }}>
                    <NewInOutForm reset={reset} />
                </FormContext.Provider>
            </DispatchContext.Provider>
        </FinancialsContext.Provider>
    )

    userEvent.click(screen.getByRole("button", { name: "Add asset" }));

    expect(setEntry).toHaveBeenCalledTimes(1);
    expect(setEntry).toHaveBeenLastCalledWith({ _id: expect.any(String), _type: "asset", name: "Cool asset", cashflow: 5200, cost: 21000, downpay: 1000 });

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenLastCalledWith({ type: "ADD", financial: { _id: expect.any(String), _type: "asset", name: "Cool asset", cashflow: 5200, cost: 21000, downpay: 1000 } });

    expect(toggleShowModal).toHaveBeenCalledTimes(1);
    expect(reset).toHaveBeenCalledTimes(1);
})
test("handles adding a liability", () => {
    const financials = InitialFinancials;
    const dispatch = jest.fn();
    const toggleShowModal = jest.fn();
    const setEntry = jest.fn();
    const setIsEditing = jest.fn();

    let entry = { _id: "test-id-any-string", _type: "liability", name: "Fierce liability", cashflow: -125, principal: 15000, interest: 0.1 } as Financial;
    let showModal = true;
    let isEditing = false;

    const reset = jest.fn();

    render(
        <FinancialsContext.Provider value={financials}>
            <DispatchContext.Provider value={dispatch}>
                <FormContext.Provider value={{ showModal, toggleShowModal, entry, setEntry, isEditing, setIsEditing }}>
                    <NewInOutForm reset={reset} />
                </FormContext.Provider>
            </DispatchContext.Provider>
        </FinancialsContext.Provider>
    )

    userEvent.click(screen.getByRole("button", { name: "Add liability" }));

    expect(setEntry).toHaveBeenCalledTimes(1);
    expect(setEntry).toHaveBeenLastCalledWith({ _id: "test-id-any-string", _type: "liability", name: "Fierce liability", cashflow: -125, principal: 15000, interest: 0.1 });

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenLastCalledWith({type: "ADD", financial: { _id: "test-id-any-string", _type: "liability", name: "Fierce liability", cashflow: -125, principal: 15000, interest: 0.1 }});

    expect(toggleShowModal).toHaveBeenCalledTimes(1);
    expect(reset).toHaveBeenCalledTimes(1);
})


test("handles editing an entry", () => {
    const financials = InitialFinancials;
    const dispatch = jest.fn();
    const toggleShowModal = jest.fn();
    const setEntry = jest.fn();
    const setIsEditing = jest.fn();

    let entry = { _id: "test-id-whatever-string", _type: "income", name: "A wonderful income", cashflow: 5600 } as Financial;
    let showModal = true;
    let isEditing = true;

    const reset = jest.fn();

    render(
        <FinancialsContext.Provider value={financials}>
            <DispatchContext.Provider value={dispatch}>
                <FormContext.Provider value={{ showModal, toggleShowModal, entry, setEntry, isEditing, setIsEditing }}>
                    <NewInOutForm reset={reset} />
                </FormContext.Provider>
            </DispatchContext.Provider>
        </FinancialsContext.Provider>
    )

    const name = screen.getByLabelText("Name");
    const cashflow = screen.getByLabelText("Cashflow");

    expect(name).toHaveProperty("value", "A wonderful income");
    userEvent.type(name, "The best income");
    expect(name).toHaveProperty("value", "The best income");

    expect(cashflow).toHaveProperty("value", "5600");
    userEvent.type(cashflow, "25200");
    expect(cashflow).toHaveProperty("value", "25200");

    userEvent.click(screen.getByRole("button", { name: "Edit income" }));

    expect(setEntry).toHaveBeenCalledTimes(1);
    expect(setEntry).toHaveBeenLastCalledWith({ _id: expect.any(String), _type: "income", name: "The best income", cashflow: "25200" });

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenLastCalledWith({ type: "EDIT", financial: { _id: expect.any(String), _type: "income", name: "The best income", cashflow: "25200" } });

    expect(toggleShowModal).toHaveBeenCalledTimes(1);
    expect(reset).toHaveBeenCalledTimes(1);
})

test("handles removing an entry", () => {
    const financials = InitialFinancials;
    const dispatch = jest.fn();
    const toggleShowModal = jest.fn();
    const setEntry = jest.fn();
    const setIsEditing = jest.fn();

    let entry = { _id: "test-id-whatever-string", _type: "expense", name: "A high expense", cashflow: -8200 } as Financial;
    let showModal = true;
    let isEditing = true;

    const reset = jest.fn();

    render(
        <FinancialsContext.Provider value={financials}>
            <DispatchContext.Provider value={dispatch}>
                <FormContext.Provider value={{ showModal, toggleShowModal, entry, setEntry, isEditing, setIsEditing }}>
                    <NewInOutForm reset={reset} />
                </FormContext.Provider>
            </DispatchContext.Provider>
        </FinancialsContext.Provider>
    )

    userEvent.click(screen.getByRole("button", { name: "Remove expense" }));

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenLastCalledWith({ type: "REMOVE", financial: { _id: expect.any(String), _type: "expense", name: "A high expense", cashflow: -8200 } });

    expect(toggleShowModal).toHaveBeenCalledTimes(1);
    expect(reset).toHaveBeenCalledTimes(1);
})