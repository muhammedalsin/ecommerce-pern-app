import { Outlet } from "react-router-dom";

import { AuthData } from "../features/auth/authData";
import Header from "../components/Header/Header";


export async function authLoader() {

  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/auth/status`,
      { credentials: "include" }
    );
    if (res.ok) {
      const authData: AuthData = await res.json();
      return authData;
    }
    throw new Error("Unexpected status code.");
  } catch (error) {
    return { logged_in: false, id: null, email_address: null, auth_method: null } as AuthData;
  }
}


export function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
