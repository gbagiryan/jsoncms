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

export const PostApi = {
    async fetchPosts() {
        return await Axios.get('/api/posts/getObjects');
    },
    async addNewPost(newPost) {
        return await Axios.post('/api/posts/createAnObject', newPost);
    }
}