import React from 'react'
import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'

import NumberInput from "./NumberInput"

test("renders with certain default values", () => {
    const { rerender } = render(<NumberInput label="cashflow" name="cashflow" value={0} onChange={jest.fn()}/>);
    expect(screen.getByLabelText("cashflow")).toBeInTheDocument();
    expect(screen.getByLabelText("cashflow")).toBeVisible();
    expect(screen.getByLabelText("cashflow")).not.toBeDisabled();
    expect(screen.getByLabelText("cashflow")).toHaveProperty("name", "cashflow");
    expect(screen.getByLabelText("cashflow")).toHaveProperty("value", "0");
    expect(screen.getByLabelText("cashflow")).toHaveProperty("pattern", "[-]?[0-9]{0,7}[.]?[0-9]{0,2}");
    expect(screen.getByLabelText("cashflow")).toHaveProperty("placeholder", "e.g. 2000 | -2000");

    rerender(<NumberInput label="cost" name="cost" value={20} onChange={jest.fn()} />)
    expect(screen.getByLabelText("cost")).toHaveProperty("name", "cost");
    expect(screen.getByLabelText("cost")).toHaveProperty("value", "20");
});

test("fires handleChange", () => {
    const handleChange = jest.fn();
    render(<NumberInput label="cashflow" name="cashflow" value={0} onChange={handleChange} />);

    const input = screen.getByLabelText("cashflow");

    expect(input).toHaveProperty("value", "0");
    userEvent.type(input, "2500");
    expect(handleChange).toHaveBeenCalledTimes(4);
})