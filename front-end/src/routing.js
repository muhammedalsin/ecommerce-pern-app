import { createBrowserRouter } from "react-router-dom";

import { App, authLoader } from "./App/App";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import { LoginPage, loginAction } from "./features/auth/LoginPage";
import { RegistrationPage, registerAction } from "./features/auth/RegistrationPage";


// https://reactrouter.com/en/main/routers/create-browser-router
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: authLoader,
    id: "app",
    children: [
      {
        path: "login",
        element: <LoginPage />,
        action: loginAction,
      },
      {
        path: "register",
        element: <RegistrationPage />,
        action: registerAction,
      },
    ],
  },
]);
