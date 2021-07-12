import { useReducer } from "react";
import clienteAxios from "../../config/axios";
import { AGREGAR_TAREA, TAREAS_PROYECTO, VALIDAR_TAREA, ELIMINAR_TAREA, TAREA_ACTUAL, ACTUALIZAR_TAREA, LIMPIAR_TAREA } from "../../types";
import TareaContext from "./tareaContext";
import tareaReducer from "./tareaReducer";

const TareaState = props => {
  const initialState = {
    tareasproyecto: [],
    errortarea: false,
    tareaseleccionada: null
  };
  const [state, dispatch] = useReducer(tareaReducer, initialState);
  const obtenerTareas = async proyecto => {
    try {
      const respuesta = await clienteAxios.get("/api/tareas", { params: { proyecto } });
      // const respuesta = await clienteAxios.get(`/api/tareas/?proyecto=${proyecto}`);

      console.log("respuesta :>> ", respuesta);
      dispatch({
        type: TAREAS_PROYECTO,
        payload: respuesta.data.tareas
      });
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  const agregarTarea = async tarea => {
    try {
      const respuesta = await clienteAxios.post("/api/tareas", tarea);
      console.log("respuesta :>> ", respuesta);
      dispatch({
        type: AGREGAR_TAREA,
        payload: respuesta.data.tarea
      });
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA
    });
  };
  const eliminarTarea = async (id, proyecto) => {
    try {
      await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto } });
      dispatch({
        type: ELIMINAR_TAREA,
        payload: id
      });
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  const actualizarTarea = async tarea => {
    try {
      const respuesta = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
      console.log("respuesta atulizart :>> ", respuesta);
      dispatch({
        type: ACTUALIZAR_TAREA,
        payload: respuesta.data
      });
    } catch (error) {
      console.log("error :>> ", error);
    }
  };
  const guardarTareaActual = tarea => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea
    });
  };

  const limpiarTarea = () => {
    dispatch({
      type: LIMPIAR_TAREA
    });
  };

  return (
    <TareaContext.Provider
      value={{
        tareasproyecto: state.tareasproyecto,
        errortarea: state.errortarea,
        tareaseleccionada: state.tareaseleccionada,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        guardarTareaActual,
        actualizarTarea,
        limpiarTarea
      }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};

export default TareaState;
