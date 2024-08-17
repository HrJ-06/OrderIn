import Contact from "../Contact";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

test("Should render", () => {
  render(<Contact />);
  const heading = screen.getAllByRole("heading");
  expect(heading.length).toBe(2);
});

it("Should give test string", () => {
  render(<Contact />);
  const text = screen.getByText("test");
  expect(text).toBeInTheDocument();
});
