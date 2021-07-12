import { CERRAR_SESION, LOGIN_ERROR, LOGIN_EXITOSO, OBTENER_USUARIO, REGISTRO_ERROR, REGISTRO_EXITOSO } from "../../types";

// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case LOGIN_EXITOSO:
    case REGISTRO_EXITOSO:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        autenticado: true,
        mensaje: null,
        cargando: false
      };
    case REGISTRO_ERROR:
    case LOGIN_ERROR:
    case CERRAR_SESION:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        mensaje: action.payload,
        autenticado: null,
        usuario: null,
        cargando: false
      };
    case OBTENER_USUARIO:
      return {
        ...state,
        usuario: action.payload,
        cargando: false
      };

    default:
      return state;
  }
};
