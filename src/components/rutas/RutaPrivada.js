import { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "../../context/autenticacion/authContext";

const RutaPrivada = ({ component: Component, ...props }) => {
  const { autenticado, cargando, usuarioAutenticado } = useContext(AuthContext);
  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line
  }, []);
  return <Route {...props} render={props => (!autenticado && !cargando ? <Redirect to="/" /> : <Component {...props} />)} />;
};

export default RutaPrivada;
