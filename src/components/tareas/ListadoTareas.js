import { useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ProyectoContext from "../../context/proyectos/proyectoContext";
import TareaContext from "../../context/tareas/tareaContext";
import Tarea from "./Tarea";

const ListadoTareas = () => {
  const proyectosContext = useContext(ProyectoContext);
  const { proyecto, eliminarProyecto } = proyectosContext;

  const tareasContext = useContext(TareaContext);
  const { tareasproyecto } = tareasContext;

  if (!proyecto) {
    return <h2>Selecciona un proyecto</h2>;
  }

  const [proyectoActual] = proyecto;

  const onClickEliminar = () => {
    eliminarProyecto(proyectoActual._id);
  };

  return (
    <>
      <h2>Proyecto: {proyectoActual.nombre} </h2>

      <ul className="listado-tareas">
        {tareasproyecto.length === 0 ? (
          <li className="tarea">
            <p>No hay tareas</p>
          </li>
        ) : (
          <TransitionGroup>
            {tareasproyecto.map(tarea => (
              <CSSTransition key={tarea.id} timeout={200} classNames="tarea">
                <Tarea tarea={tarea} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>

      <button type="button" className="btn btn-eliminar" onClick={onClickEliminar}>
        Eliminar Proyecto &times;
      </button>
    </>
  );
};

export default ListadoTareas;
