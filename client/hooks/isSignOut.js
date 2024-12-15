import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";

export default function useIsSignOut() {
  const authContext = useContext(LoginContext);
  return !authContext.isLoggedIn;
}
