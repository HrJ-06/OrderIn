import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import OrderCard from "../OrderCard";
import MOCK_DATA from "../mocks/orderMock.json";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import Header from "../Header";
import { BrowserRouter } from "react-router-dom";

it("Should render order card", () => {
  render(
    <Provider store={appStore}>
      <OrderCard data={MOCK_DATA} />
    </Provider>
  );
  const name = screen.getByText("Schezwan Chicken Dry");
  expect(name).toBeInTheDocument();
});

it("Should add item to cart", () => {
  render(
    <Provider store={appStore}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
      <OrderCard data={MOCK_DATA} />
    </Provider>
  );
  const cart = screen.getByText("Cart(0)");
  expect(cart).toBeInTheDocument();
  const add = screen.getByRole("button", { name: "Add" });
  fireEvent.click(add);
  const added = screen.getByText("Cart(1)");
  expect(added).toBeInTheDocument();
});
