import { NavLink, useNavigate, useRouteLoaderData } from "react-router-dom";
import { AuthData } from "../../features/auth/authData";
import styles from "./MainNav.module.css";


export default function MainNav() {
  // https://reactrouter.com/en/main/hooks/use-route-loader-data
  const authData = useRouteLoaderData("app") as AuthData;
  const navigate = useNavigate();

  async function handleClickLogOut() {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/auth/logout`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      if (!res.ok) {
        throw new Error("Unexpected status code.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      navigate(0);  // Refresh page to clear auth state and re-render
    }
  }

  function renderNavItem(path: string, anchor: string, onClick?: () => void) {
    return (
      <li className={styles.listItem}>
        <NavLink to={path} className={styles.link} onClick={onClick}>{anchor}</NavLink>
      </li>
    );
  }

  return (
    <nav className={styles.mainNav}>
      <ul className={styles.navList}>
        {renderNavItem("/", "Ana Sayfa")}
        {renderNavItem("/category/books", "Ürünler")}
      </ul>
      
      {authData?.logged_in ?
      <ul className={styles.navList}>
        {renderNavItem("/account", "Hesap")}
        {renderNavItem("/cart", "Sepet")}
        {renderNavItem("#", "Çıkış Yap", handleClickLogOut)}
      </ul>
      :
      <ul className={styles.navList}>
        {renderNavItem("/login", "Giriş yapmak")}
        {renderNavItem("/register", "Kayıt olmak")}
      </ul>
      }
    </nav>
  );
}
