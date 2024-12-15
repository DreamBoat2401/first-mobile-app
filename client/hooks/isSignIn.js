import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";

export default function useIsSignIn() {
  const authContext = useContext(LoginContext);
  return authContext.isLoggedIn;
}
