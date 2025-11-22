export function validarCategoria(categoria, errores, campo) {
  switch(campo) {
    case 'nombre':
      categoria.nombre = categoria.nombre.replace(/^\s+/, '').replace(/\s{2,}/g, ' ');
      if (!categoria.nombre) {
        errores.nombre = 'Este campo es obligatorio.';
      } else {
        errores.nombre = '';
      }
      break;

    case 'icono':
      if (!categoria.icono) {
        errores.icono = 'Debe seleccionar un ícono.';
      } else {
        errores.icono = '';
      }
      break;
    case 'color':
      if (!categoria.color) {
        errores.color = 'Debe seleccionar un color.';
      } else {
        errores.color = '';
      }
      break;
  }
}

export function validarFormulario(categoria, errores) {
  const camposObligatorios = [ 'nombre', 'icono', 'color' ];
  let validado = true;
  Object.keys(categoria).forEach(campo => {
    if (typeof(categoria[campo]) === 'string')  categoria[campo] = categoria[campo].trim();
    validarCategoria(categoria, errores, campo);
    if(camposObligatorios.includes(campo) && errores[campo]) validado = false;
  });
  return validado;
}