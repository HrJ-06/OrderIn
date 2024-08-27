import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import { ReactNotifications } from "react-notifications-component";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import About from "./components/About";
import Error from "./components/Error";
import Contact from "./components/Contact";
import Restaurant from "./components/Restaurant";
import contextAPI from "./utils/contextAPI";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Login from "./components/Login";

const App = () => {
  const [testCon, setTestCon] = useState("");
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const data = {
      name: "",
    };
    setTestCon(data.name);
  }, []);

  return (
    <Provider store={appStore}>
      <div className="flex flex-col min-h-screen">
        <contextAPI.Provider
          value={{ loggedUser: testCon, setTestCon, login, setLogin }}
        >
          <ReactNotifications />
          <Header />
          <div className="flex-grow bg-[#f0ddaa]">
            <Outlet />
          </div>
          <Footer />
        </contextAPI.Provider>
      </div>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurant/:resId",
        element: <Restaurant />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
