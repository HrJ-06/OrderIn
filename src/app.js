import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
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

const Grocery = lazy(() => import("./components/Grocery"));

const Footer = () => <p> This is the footer</p>;

const App = () => {
  const [testCon, setTestCon] = useState();

  useEffect(() => {
    const data = {
      name: "Hrishit",
    };

    setTestCon(data.name);
  }, []);
  return (
    <Provider store={appStore}>
      <div>
        <contextAPI.Provider value={{ loggedUser: testCon, setTestCon }}>
          <Header />
          <Outlet />
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
        path: "/About",
        element: <About />,
      },
      {
        path: "/Contact",
        element: <Contact />,
      },
      {
        path: "/restaurant/:resId",
        element: <Restaurant />,
      },
      {
        path: "/Grocery",
        element: (
          <Suspense>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/Cart",
        element: <Cart />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
