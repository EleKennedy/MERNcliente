import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";

const Login = props => {
  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, iniciarSesion } = authContext;
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;
  //redirigir si esta autenticado alertar si pass incorrecto o usuario no registrado

  useEffect(() => {
    if (autenticado) {
      //si autenticado cambia de null a true redirige a /proyectos
      props.history.push("/proyectos");
    }
    if (mensaje) {
      //si hay un mensaje es pq hay error
      mostrarAlerta(mensaje.msg, mensaje.categoria);
      return;
    } // eslint-disable-next-line
  }, [autenticado, mensaje, props.history]);
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const { email, password } = user;

  const onChangeLogin = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmitLogin = e => {
    e.preventDefault();
    //validar campos vacios
    if (email.trim() === "" || password.trim() === "") {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    }
    //action
    iniciarSesion({ email, password });
  };
  return (
    <div className="form-usuario">
      {alerta ? <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> : null}
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesión</h1>
        <form onSubmit={onSubmitLogin}>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Tu Email" value={email} onChange={onChangeLogin} />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Tu Password" value={password} onChange={onChangeLogin} />
          </div>
          <div className="campo-form">
            <input type="submit" className="btn btn-primario btn-block" value="Iniciar Sesión" />
          </div>
        </form>
        <Link to={"/nueva-cuenta"} className="enlace-cuenta">
          Obtener cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;
