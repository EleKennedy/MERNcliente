import { useReducer } from "react";
import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTO,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
  PROYECTO_ERROR
} from "../../types";
import ProyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";
import clienteAxios from "../../config/axios";

const ProyectoState = props => {
  const initialState = {
    proyectos: [],
    formulario: false,
    errorformulario: false,
    proyecto: null,
    mensaje: null
  };
  //dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(proyectoReducer, initialState);
  // funciones para CRUD
  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO
    });
  };
  const obtenerProyectos = async () => {
    try {
      const respuesta = await clienteAxios.get("/api/proyectos");
      dispatch({
        type: OBTENER_PROYECTO,
        payload: respuesta.data.proyectos
      });
    } catch (error) {
      dispatch({
        type: PROYECTO_ERROR,
        payload: {
          msg: "Hubo un error",
          categoria: "alerta-error"
        }
      });
    }
  };
  const agregarProyecto = async proyecto => {
    //agregar el proyecto
    try {
      const respuesta = await clienteAxios.post("/api/proyectos", proyecto);

      dispatch({
        type: AGREGAR_PROYECTO,
        payload: respuesta.data
      });
    } catch (error) {
      dispatch({
        type: PROYECTO_ERROR,
        payload: {
          msg: "Hubo un error",
          categoria: "alerta-error"
        }
      });
    }
  };
  //Valida formulario
  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO
    });
  };
  const proyectoActual = proyectoId => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoId
    });
  };
  const eliminarProyecto = async proyectoId => {
    try {
      await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
      dispatch({
        type: ELIMINAR_PROYECTO,
        payload: proyectoId
      });
    } catch (error) {
      dispatch({
        type: PROYECTO_ERROR,
        payload: {
          msg: "Hubo un error",
          categoria: "alerta-error"
        }
      });
    }
  };

  return (
    <ProyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        errorformulario: state.errorformulario,
        proyecto: state.proyecto,
        mensaje: state.mensaje,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto
      }}
    >
      {props.children}
    </ProyectoContext.Provider>
  );
};

export default ProyectoState;
