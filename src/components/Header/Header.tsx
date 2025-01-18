import React from "react";
import Logo from "../Logo/Logo.tsx";
import styles from "./Header.module.css";
import { useSelector } from "react-redux";
import { selectIsAuth, selectUserName } from "../../features/authentication/authenticationSlice.ts";

const Header: React.FC = () => {
  const isAuth = useSelector(selectIsAuth);
  const userName = useSelector(selectUserName);

  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.navList}>
          <li className={styles.logoContainer}>
            <Logo height={"1.2em"} width={"1.2em"}/>
          </li>
          <li className={styles.textContainer}>
            TODO LIST
          </li>
          {
            !isAuth && (
              <li className={styles.authButton}>
                {userName}
                <button className={styles.logoutButton}>Logout</button>
              </li>
            )
          }
        </ul>
      </nav>
    </header>

  );
};

export default Header;