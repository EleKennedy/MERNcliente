import { useContext, useEffect, useState } from "react";
import ProyectoContext from "../../context/proyectos/proyectoContext";
import TareaContext from "../../context/tareas/tareaContext";

const FromTarea = () => {
  //context
  const { proyecto } = useContext(ProyectoContext);
  const { tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea } = useContext(TareaContext);
  //state local
  const [tarea, setTarea] = useState({
    nombre: ""
  });
  //actualizar componente
  useEffect(() => {
    if (tareaseleccionada !== null) {
      setTarea(tareaseleccionada);
    } else {
      setTarea({
        nombre: ""
      });
    }
  }, [tareaseleccionada]);

  if (!proyecto) {
    return null;
  }

  const [proyectoActual] = proyecto;
  const { nombre } = tarea;
  const onChangeTarea = e => {
    setTarea({ ...tarea, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = e => {
    e.preventDefault();
    // validar
    if (nombre === "") {
      validarTarea();
      return;
    }
    //revisar si es edicion o nueva tarea
    if (tareaseleccionada === null) {
      //tarea nueva
      //agregar al state
      tarea.proyecto = proyectoActual._id;
      agregarTarea(tarea);
    } else {
      //actualizar tarea
      actualizarTarea(tarea);
      limpiarTarea();
    }
    //re otener tareas para agregarla a la lista
    obtenerTareas(proyectoActual._id);
    //reiniciar form
    setTarea({
      nombre: ""
    });
  };

  return (
    <div className="formulario">
      <form onSubmit={handleOnSubmit}>
        <div className="contenedor-input">
          <input type="text" className="input-text" placeholder="Nombre Tarea..." name="nombre" value={nombre} onChange={onChangeTarea} />
        </div>

        <div className="contenedor-input">
          <input type="submit" className="btn btn-primario btn-submit btn-block" value={tareaseleccionada ? "Editar Tarea" : "Agregar Tarea"} />
        </div>
      </form>
      {errortarea ? <p className="mensaje error">Dale un Nombre a la Tarea para agregarla</p> : null}
    </div>
  );
};

export default FromTarea;
