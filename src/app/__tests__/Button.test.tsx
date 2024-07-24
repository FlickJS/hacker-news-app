import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Button from "../_components/_layout/Button";

describe("Button component", () => {
  test("renders the button with correct text", () => {
    render(<Button onClick={() => {}}>Load more stories</Button>);
    const buttonElement = screen.getByText(/Load more stories/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test("calls the onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Load more stories</Button>);
    const buttonElement = screen.getByText(/Load more stories/i);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
