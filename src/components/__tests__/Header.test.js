import { fireEvent, render, screen } from "@testing-library/react";
import appStore from "../../utils/appStore";
import { Provider } from "react-redux";
import Header from "../Header";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

it("Should render header with online status", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );
  const onlineStatus = screen.getByText("Home");
  expect(onlineStatus).toBeInTheDocument();
});

it("Should change login when clicked", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );
  const login = screen.getByText("Login");
  fireEvent.click(login);
  const logout = screen.getByText("Logout");
  expect(logout).toBeInTheDocument();
});

it("Should print grocery", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  const groc = screen.getByText("Grocery");
  expect(groc).toBeInTheDocument();
});
