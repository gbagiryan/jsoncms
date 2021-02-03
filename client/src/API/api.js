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
    async addNewObject(newObject) {
        return await Axios.post('/api/posts/createAnObject', newObject);
    }
}