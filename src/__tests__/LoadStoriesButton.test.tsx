import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../app/page";
import { StoriesProvider } from "../context/StoriesContext";
import { describe, expect } from "vitest";

describe("Home page", () => {
  beforeEach(() => {
    render(
      <StoriesProvider>
        <Home />
      </StoriesProvider>
    );
  });

  test('should display 5 stories initially and 10 after clicking "Load more stories"', async () => {
    const initialStories = await screen.findAllByText(/Written by:/i);
    expect(initialStories).toHaveLength(5);

    const loadMoreButton = screen.getByText(/Load more stories/i);
    fireEvent.click(loadMoreButton);

    const updatedStories = await screen.findAllByText(/Written by:/i);
    expect(updatedStories).toHaveLength(10);
  });
});
