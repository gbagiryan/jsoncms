import Axios from 'axios';

export const AuthApi = {
  async signIn (username, password) {
    return await Axios.post('/api/auth/signIn', { username, password });
  },
  async signUp (username, password) {
    return await Axios.post('/api/auth/signUp', { username, password });
  },
  async signOut () {
    return await Axios.get('/api/auth/signOut');
  },
  async verifyAuth () {
    return await Axios.get('/api/auth/verifyAuth');
  }
};

export const ObjApi = {
  async fetchObjs () {
    return await Axios.get('/api/backoffice/getObjs');
  },
  async fetchAnObj (objId) {
    return await Axios.get(`/api/backoffice/getAnObj/${objId}`);
  },
  async addNewObj (newObj) {
    return await Axios.post('/api/backoffice/createAnObj', newObj);
  },
  async updateObj (objId, updatedObj) {
    return await Axios.patch(`/api/backoffice/updateObj/${objId}`, updatedObj);
  },
  async deleteObj (objId) {
    return await Axios.delete(`/api/backoffice/deleteObj/${objId}`);
  },
  async getObjByTag (tags) {
    return await Axios.post(`/api/backoffice/getObjsByTag`, tags);
  }
};