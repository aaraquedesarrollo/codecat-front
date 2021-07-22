import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "./AuthContext";

export const AuthContextProvider = (props) => {
  const { children } = props;
  const token = localStorage.getItem("token");
  const [logueado, setLogueado] = useState(!!token);
  const history = useHistory();
  useEffect(() => {
    if (!token) {
      history.push("/principal");
    } else {
      history.push("/codecat");
    }
  }, [history, token]);
  const loguearUsuario = (token) => {
    localStorage.setItem("token", token);
    setLogueado(true);
    history.push("/codecat");
  };
  const desloguearUsuario = useCallback(() => {
    localStorage.removeItem("token");
    setLogueado(false);
  }, []);
  return (
    <AuthContext.Provider
      value={{
        logueado,
        token,
        desloguearUsuario,
        loguearUsuario,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
