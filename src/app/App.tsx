import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./App.module.css";
import { useAppDispatch } from "./hooks.ts";
import { auth, selectIsAuth } from "../features/authentication/authenticationSlice.ts";
import Header from "../components/Header/Header.tsx";

const App: React.FC = () =>  {
  const dispatch = useAppDispatch();
  const isAuth = useSelector(selectIsAuth);

  console.log("render");

  useEffect(() => {
    dispatch(auth());
  }, [dispatch]);

  // const setAuthHandler = () => {
  //   console.log("clicked");
  // };

  return (
    <div className={styles.container}>
      <Header/>
        {isAuth ? "Logged In" : "Logged Out"}
    </div>
  );
}

export default App;
