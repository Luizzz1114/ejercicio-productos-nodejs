export function respuestaSuccess(req, res, status = 200, mensaje = '', data = null) {
  res.status(status).json({
    ok: true,
    statusCode: status,
    mensaje: mensaje,
    data: data
  });
}

export function respuestaError(req, res, status = 500, mensaje = 'Error interno.', detalles = null) {
  res.status(status).json({
    ok: false,
    statusCode: status,
    mensaje: mensaje,
    detalles: detalles
  });
}