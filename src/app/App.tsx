import "./App.css";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks.ts";
import { useSelector } from "react-redux";
import { RootState } from "./store.ts";
import { auth } from "../features/authentication/authenticationSlice.ts";

function App() {
  const dispatch = useAppDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  useEffect(()=>{
    dispatch(auth());
  }, [dispatch]);

  return (
      <div className="container">
        {authState.isAuth ? "Logged In" : "Logged Out"}
      </div>
  );
}

export default App;
