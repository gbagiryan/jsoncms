import Axios from 'axios';

export const AuthApi = {
    async signIn(username, password) {
        return await Axios.post('/api/auth/signIn', {username, password});
    },
    async signUp(username, password) {
        return await Axios.post('/api/auth/signUp', {username, password});
    },
    async signOut() {
        return await Axios.get('/api/auth/signOut');
    },
    async verifyAuth() {
        return await Axios.get('/api/auth/verifyAuth');
    }
}

export const ObjectApi = {
    async fetchObjects() {
        return await Axios.get('/api/posts/getObjects');
    },
    async fetchAnObject(objectId) {
        return await Axios.get(`/api/posts/getAnObject/${objectId}`);
    },
    async addNewObject(newObject) {
        return await Axios.post('/api/posts/createAnObject', newObject);
    },
    async updateObject(objectId, updatedObject) {
        return await Axios.patch(`/api/posts/updateObject/${objectId}`, updatedObject);
    },
    async deleteObject(objectId) {
        return await Axios.delete(`/api/posts/deleteObject/${objectId}`);
    },
    async getObjectsByTag(tags) {
        return await Axios.post(`/api/posts/getObjectsByTag`, tags);
    },
    async downloadFile(fileName) {
        return await Axios.get(`/api/posts/download/${fileName}`);
    }
}