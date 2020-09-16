import React from 'react'
import { render, screen } from "@testing-library/react"

import { SubmitButton } from "./SubmitButton"

test("renders correct text", () => {
    const { rerender } = render(<SubmitButton text="Add Income"/>);
    expect(screen.queryByText("Add Income")).toBeTruthy();
    expect(screen.queryByText("Add")).toBeFalsy();

    rerender(<SubmitButton text="Add"  />)
    expect(screen.queryByText("Add")).toBeTruthy();
    expect(screen.queryByText("Add Income")).toBeFalsy();
});