import Axios from 'axios';

export const AuthApi = {
  async signIn (username, password) {
    return await Axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/api/auth/signIn`, { username, password });
  },
  async signUp (username, password) {
    return await Axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/api/auth/signUp`, { username, password });
  },
  async signOut () {
    return await Axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/auth/signOut`);
  },
  async verifyAuth () {
    return await Axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/auth/verifyAuth`);
  }
};

export const ObjApi = {
  async fetchObjs () {
    return await Axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/backoffice/getObjs`);
  },
  async addNewObj (newObj) {
    return await Axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/api/backoffice/createAnObj`, newObj);
  },
  async updateObj (objId, updatedObj) {
    return await Axios.patch(`${process.env.REACT_APP_SERVER_BASE_URL}/api/backoffice/updateObj/${objId}`, updatedObj);
  },
  async deleteObj (objId) {
    return await Axios.delete(`${process.env.REACT_APP_SERVER_BASE_URL}/api/backoffice/deleteObj/${objId}`);
  }
};
