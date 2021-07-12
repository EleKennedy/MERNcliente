import { useContext, useState } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";

const NuevoProyecto = () => {
  const proyectosContext = useContext(proyectoContext);
  const { formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext;
  const [proyecto, setProyecto] = useState({
    nombre: ""
  });
  const { nombre } = proyecto;
  const onChangeProyecto = e => {
    setProyecto({ ...proyecto, [e.target.name]: e.target.value });
  };
  const onSubmitProyecto = e => {
    e.preventDefault();
    //validar campos vacios

    if (nombre === "") {
      mostrarError();
      return;
    }

    //agregar al state
    agregarProyecto(proyecto);
    //reiniciar form
    setProyecto({
      nombre: ""
    });
  };
  const onClickForm = () => {
    mostrarFormulario();
  };
  return (
    <>
      <button type="button" className="btn btn-primario btn-block" onClick={onClickForm}>
        Nuevo Proyecto
      </button>

      {formulario ? (
        <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
          <input type="text" className="input-text" placeholder="Nombre Proyecto" name="nombre" onChange={onChangeProyecto} value={nombre} />
          <input type="submit" className="btn btn-primario btn-block" value="Agregar Proyecto" />
        </form>
      ) : null}
      {errorformulario ? <p className="mensaje error">El nombre del proyecto es obligatorio</p> : null}
    </>
  );
};

export default NuevoProyecto;
