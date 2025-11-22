import api from '../api/axios.js';

export default {
  async listar() {
    const res = await api.get('/usuarios');
    const json = res.data;
    return json.data; 
  },

  async crear(usuario) {
    const res = await api.post('/usuarios', usuario);
    return res.data;
  },

  async leer(id) {
    const res = await api.get(`/usuarios/${id}`);
    const json = res.data;
    return json.data; 
  },

  async actualizar(usuario) {
    const res = await api.put(`/usuarios/${usuario.id}`, usuario);
    return res.data;
  },

  async eliminar(id) {
    const res = await api.delete(`/usuarios/${id}`);
    return res.data;
  },

  async login(usuario) {
    const res = await api.post('/usuarios/login', usuario);
    localStorage.setItem('usuario', JSON.stringify(res.data.data));
    return res.data;
  },

  async logout() {
    await api.post('/usuarios/logout');
    localStorage.removeItem('usuario');
  }
}