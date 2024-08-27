import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Body from "../Body";
import MOCK_DATA from "../mocks/bodyMock.json";
import { act } from "react";
import { BrowserRouter } from "react-router-dom";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_DATA);
    },
  });
});

it("Should render Hello text", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    );
  });

  const input = screen.getByTestId("input");
  // const cardd = screen.getAllByTestId("cards");
  // expect(cardd.length).toBe(8);
  fireEvent.change(input, { target: { value: "burger" } });
  const search = screen.getByRole("button", { name: "Search" });
  fireEvent.click(search);
  const carr = screen.getAllByTestId("cardss");
  expect(carr.length).toBe(2);
});
