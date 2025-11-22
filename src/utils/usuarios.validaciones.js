export function validarUsuario(usuario, errores, campo) {
  const regexNombre = /^(?=.{5,16}$)(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9._]+$/;
  const regexCorreo = /^[a-z0-9]+(?:\.[a-z0-9]+)*@[a-z0-9-]+(?:\.[a-z0-9-]+){0,2}\.[a-z]{2,}$/;
  const regexContrasena = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;

  switch(campo) {
    case 'nombre':
      if (!usuario.nombre) {
        errores.nombre = 'Este campo es obligatorio.';
      } else if (!/^[a-zA-Z0-9._]+$/.test(usuario.nombre)) {
        errores.nombre = 'El nombre de usuario solo puede contener letras, números, guiones bajos (_) y puntos (.).';
        usuario.nombre = usuario.nombre.replace(/[^a-zA-Z0-9._]/g, '');
      } else if (/^[._]/.test(usuario.nombre)) {
        errores.nombre = 'El nombre de usuario no puede comenzar con guiones bajos (_) o puntos (.).';
      } else if (!regexNombre.test(usuario.nombre)) {
        errores.nombre = 'El nombre de usuario debe tener entre 5 y 16 caracteres, incluir al menos una letra y un número.';
      } else {
        errores.nombre = '';
      }
      break;

    case 'rol':
      if (!usuario.rol) {
        errores.rol = 'Este campo es obligatorio.';
      } else {
        errores.rol = '';
      }
      break;
    
    case 'correo':
      usuario.correo = usuario.correo.replace(/\s/g, '');
      if (!usuario.correo) {
        errores.correo = 'Este campo es obligatorio.';
      } else if (!regexCorreo.test(usuario.correo)) {
        errores.correo = 'El correo debe tener el formato ejemplo@email.com';
      } else {
        errores.correo = '';
      }
      break;

    case 'contrasena':
      usuario.contrasena = usuario.contrasena.replace(/[^A-Za-z0-9!@#$%^&*()]/g, '');
      if (!usuario.contrasena) {
        errores.contrasena = 'Este campo es obligatorio.';
      } else if (!regexContrasena.test(usuario.contrasena)) {
        errores.contrasena = 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un caracter especial.';
      } else {
        errores.contrasena = '';
      }
      break;
  }
}

export function validarFormulario(usuario, errores) {
  const camposObligatorios = [ 'nombre', 'correo', 'contrasena', 'rol' ];
  let validado = true;
  Object.keys(usuario).forEach(campo => {
    if (typeof(usuario[campo]) === 'string')  usuario[campo] = usuario[campo].trim();
    validarUsuario(usuario, errores, campo);
    if(camposObligatorios.includes(campo) && errores[campo]) validado = false;
  });
  return validado;
}