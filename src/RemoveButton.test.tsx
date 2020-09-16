import React from 'react'
import { render, screen, fireEvent } from "@testing-library/react"

import { RemoveButton } from "./RemoveButton"

test("renders with or without text", () => {
    const handleRemove = jest.fn();
    const { rerender } = render(<RemoveButton handleRemove={handleRemove} />);
    expect(screen.queryByText("Remove")).toBeTruthy();
    expect(screen.queryByText("Löschen")).toBeFalsy();
    
    rerender(<RemoveButton text="Remove" handleRemove={handleRemove} />)
    expect(screen.queryByText("Remove")).toBeTruthy();
    expect(screen.queryByText("Löschen")).toBeFalsy();

    rerender(<RemoveButton text="Löschen" handleRemove={handleRemove} />)
    expect(screen.queryByText("Remove")).toBeFalsy();
    expect(screen.queryByText("Löschen")).toBeTruthy();
});

test("calls handleRemove once when clicked", () => {
    const handleRemove = jest.fn();
    render(<RemoveButton text="Delete" handleRemove={handleRemove} />);

    fireEvent.click(screen.getByRole("button", {name: "Delete"}));

    expect(handleRemove).toHaveBeenCalledTimes(1);
});