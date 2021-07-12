import { useContext } from "react";
import ProyectoContext from "../../context/proyectos/proyectoContext";
import TareaContext from "../../context/tareas/tareaContext";

const Proyecto = ({ proyecto }) => {
  const proyectosContext = useContext(ProyectoContext);
  const { proyectoActual } = proyectosContext;
  const tareasContext = useContext(TareaContext);
  const { obtenerTareas } = tareasContext;

  const seleccionarProyecto = id => {
    proyectoActual(id);
    obtenerTareas(id);
  };

  return (
    <li>
      <button type="button" className="btn btn-blank" onClick={() => seleccionarProyecto(proyecto._id)}>
        {proyecto.nombre}
      </button>
    </li>
  );
};

export default Proyecto;
