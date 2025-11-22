import api from '../api/axios.js';

export default {
  async listar() {
    const res = await api.get('/categorias');
    const json = res.data;
    return json.data;
  },

  async crear(categoria) {
    const res = await api.post('/categorias', categoria);
    return res.data;
  },

  async leer(id) {
    const res = await api.get(`/categorias/${id}`);
    const json = res.data;
    return json.data;
  },

  async actualizar(categoria) {
    const res = await api.put(`/categorias/${categoria.id}`, categoria);
    return res.data;
  },

  async eliminar(id) {
    const res = await api.delete(`/categorias/${id}`);
    return res.data;
  }
}