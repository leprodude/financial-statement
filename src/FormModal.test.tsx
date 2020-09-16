import React from 'react'
import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import InitialFinancials from "./InitialFinancials"
import { Financial } from './Financials'
import { FinancialsContext, DispatchContext } from "./contexts/FinancialsContext"
import { FormContext } from "./contexts/FormContext"

import { FormModal } from "./FormModal"

test("handles closing the form modal", () => {
    const financials = InitialFinancials;
    const dispatch = jest.fn();
    const toggleShowModal = jest.fn();
    const setEntry = jest.fn();
    const setIsEditing = jest.fn();

    let entry = { _id: "test-id-whatever-string", _type: "expense", name: "A high expense", cashflow: -8200 } as Financial;
    let showModal = true;
    let isEditing = true;

    render(
        <FinancialsContext.Provider value={financials}>
            <DispatchContext.Provider value={dispatch}>
                <FormContext.Provider value={{ showModal, toggleShowModal, entry, setEntry, isEditing, setIsEditing }}>
                    <FormModal />
                </FormContext.Provider>
            </DispatchContext.Provider>
        </FinancialsContext.Provider>
    )

    userEvent.click(screen.getByRole('button', { name: /close form/i }));

    expect(toggleShowModal).toHaveBeenCalledTimes(1);
    
    expect(setEntry).toHaveBeenCalledTimes(1);
    expect(setEntry).toHaveBeenLastCalledWith(undefined);

    expect(setIsEditing).toHaveBeenCalledTimes(1);
    expect(setIsEditing).toHaveBeenLastCalledWith(false);
})