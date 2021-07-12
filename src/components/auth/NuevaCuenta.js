import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";

const NuevaCuenta = props => {
  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, registrarUsuario } = authContext;
  const alertaContext = useContext(AlertaContext);
  const { mostrarAlerta, alerta } = alertaContext;

  //redirigir si esta autenticado alertar si hay un registro duplicado
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
    nombre: "",
    email: "",
    password: "",
    confirmar: ""
  });
  const { email, password, nombre, confirmar } = user;
  const onChangeNew = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmitNew = e => {
    e.preventDefault();
    //validar campos vacios
    if (nombre.trim() === "" || email.trim() === "" || password.trim() === "" || confirmar.trim() === "") {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    }

    //validar largo password
    if (password.length < 6) {
      mostrarAlerta("El password debe tener al menos 6 caracteres", "alerta-error");
      return;
    }
    //validar confirmar password
    if (password !== confirmar) {
      mostrarAlerta("Los passwords deben ser iguales ", "alerta-error");
      return;
    }
    // action;
    registrarUsuario({ email, password, nombre });
  };
  return (
    <div className="form-usuario">
      {alerta ? <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> : null}
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesión</h1>
        <form onSubmit={onSubmitNew}>
          <div className="campo-form">
            <label htmlFor="nombre">Nombre</label>
            <input type="text" id="nombre" name="nombre" placeholder="Tu Nombre" value={nombre} onChange={onChangeNew} />
          </div>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Tu Email" value={email} onChange={onChangeNew} />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Tu Password" value={password} onChange={onChangeNew} />
          </div>
          <div className="campo-form">
            <label htmlFor="confirmar">Confirma Tu Password</label>
            <input type="password" id="confirmar" name="confirmar" placeholder="Repite el Password" value={confirmar} onChange={onChangeNew} />
          </div>
          <div className="campo-form">
            <input type="submit" className="btn btn-primario btn-block" value="Registra tu cuenta" />
          </div>
        </form>
        <Link to={"/"} className="enlace-cuenta">
          {"<<<"}Volver a Login
        </Link>
      </div>
    </div>
  );
};

export default NuevaCuenta;
