import { useReducer } from "react";
import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/token";
import { CERRAR_SESION, LOGIN_ERROR, LOGIN_EXITOSO, OBTENER_USUARIO, REGISTRO_ERROR, REGISTRO_EXITOSO } from "../../types";
import AuthContext from "./authContext";
import authReducer from "./authReducer";

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    autenticado: null,
    usuario: null,
    mensaje: null,
    cargando: true
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const registrarUsuario = async datos => {
    try {
      const respuesta = await clienteAxios.post("/api/usuarios", datos);

      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data
      });
      //obtener usuario autenticado
      usuarioAutenticado();
    } catch (error) {
      console.log("error registrarUsuario :>> ", error.response.data.msg);

      dispatch({
        type: REGISTRO_ERROR,
        payload: {
          msg: error.response.data.msg,
          categoria: "alerta-error"
        }
      });
    }
  };
  const usuarioAutenticado = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      //enviar token al backend por headers
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.get("api/auth");

      dispatch({
        type: OBTENER_USUARIO,
        payload: respuesta.data.usuario
      });
    } catch (error) {
      console.log("error usuarioAutenticado :>> ", error);
      dispatch({
        type: LOGIN_ERROR,
        payload: {
          msg: error.response.data.msg,
          categoria: "alerta-error"
        }
      });
    }
  };
  //iniciar sesion
  const iniciarSesion = async datos => {
    try {
      const respuesta = await clienteAxios.post("api/auth", datos);

      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data
      });
      //obtener usuario autenticado
      usuarioAutenticado();
    } catch (error) {
      console.log("error iniciarSesion :>> ", error.response.data.msg);

      dispatch({
        type: LOGIN_ERROR,
        payload: {
          msg: error.response.data.msg,
          categoria: "alerta-error"
        }
      });
    }
  };
  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        cargando: state.cargando,
        registrarUsuario,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
