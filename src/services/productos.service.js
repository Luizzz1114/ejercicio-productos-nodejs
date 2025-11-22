import api from '../api/axios.js';

export default {
  async listar() {
    const res = await api.get('/productos');
    const json = res.data;
    return json.data; 
  },

  async crear(producto) {
    const res = await api.post('/productos', producto);
    return res.data;
  },

  async leer(id) {
    const res = await api.get(`/productos/${id}`);
    const json = res.data;
    return json.data;
  },

  async actualizar(producto) {
    const res = await api.put(`/productos/${producto.id}`, producto);
    return res.data;
  },

  async eliminar(id) {
    const res = await api.delete(`/productos/${id}`);
    return res.data;
  }
}