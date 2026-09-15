function validarCamposIncidencia(datos) {
  const { empleado, area, descripcion, prioridad } = datos;

  if (!empleado || !area || !descripcion || !prioridad) {
    return { valido: false, mensaje: "Todos los campos son obligatorios" };
  }

  if (
    empleado.trim() === "" ||
    area.trim() === "" ||
    descripcion.trim() === "" ||
    prioridad.trim() === ""
  ) {
    return { valido: false, mensaje: "No se permiten cadenas vacias" };
  }

  if (!esPrioridadValida(prioridad)) {
    return { valido: false, mensaje: "La prioridad debe ser Alta, Media o Baja" };
  }

  return { valido: true, mensaje: "Datos validos" };
}

function esPrioridadValida(prioridad) {
  const valor = prioridad.trim().toLowerCase();

  if (valor === "alta" || valor === "media" || valor === "baja") {
    return true;
  } else {
    return false;
  }
}

function esEstadoValido(estado) {
  const valor = estado.trim().toLowerCase();
  const estadosValidos = ["pendiente", "en proceso", "resuelta", "cancelada"];

  return estadosValidos.includes(valor);
}

module.exports = {
    validarCamposIncidencia,
    esPrioridadValida,
    esEstadoValido
}; 