export function validarProducto(producto, errores, campo) {
  switch(campo) {
    case 'nombre':
      producto.nombre = producto.nombre.replace(/^\s+/, '').replace(/\s{2,}/g, ' ');
      if (!producto.nombre) {
        errores.nombre = 'Este campo es obligatorio.';
      } else {
        errores.nombre = '';
      }
      break;

    case 'categoria_id':
      if (!producto.categoria_id) {
        errores.categoria = 'Este campo es obligatorio.';
      } else {
        errores.categoria = '';
      }
      break;

    case 'precio':
      const numeros = producto.precio.replace(/\D/g, '');
      const formato = numeros / 100;
      producto.precio = formato.toFixed(2);
      if (producto.precio === '0.00') {
        errores.precio = 'El precio debe ser mayor de 0.'
      } else {
        errores.precio = '';
      }
      break;

    case 'stock':
      producto.stock = producto.stock.toString().replace(/\s/g, '').replace(/^0{2,}/, '0');
      if (!producto.stock) {
        errores.stock = 'Este campo es obligatorio.';
      } else if (!/^[0-9]*$/.test(producto.stock)) {
        errores.stock = 'El stock debe ser un número entero.'
        producto.stock = producto.stock.replace(/[^0-9]/g, '');
      } else {
        errores.stock = '';
      }
      break;
  }
}

export function validarFormulario(producto, errores) {
  const camposObligatorios = [ 'nombre', 'categoria', 'precio', 'stock' ];
  let validado = true;
  Object.keys(producto).forEach(campo => {
    if (typeof(producto[campo]) === 'string')  producto[campo] = producto[campo].trim();
    validarProducto(producto, errores, campo);
    if(camposObligatorios.includes(campo) && errores[campo]) validado = false;
  });
  return validado;
}