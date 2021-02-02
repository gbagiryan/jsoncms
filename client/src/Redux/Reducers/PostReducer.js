import {PostApi} from "../../API/api";

const POST_SET_POST_DATA = 'POST_SET_POST_DATA';

const initialState = {
    posts: null
};

const PostReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_SET_POST_DATA:
            return {
                ...state,
                posts: action.postData
            }
        default:
            return state;
    }
};
//action creators
const setPostData = (postData) => ({type: POST_SET_POST_DATA, postData});

//thunks
export const fetchPosts = (isAuthed) => async (dispatch) => {
    try {
        if (!isAuthed) {
            dispatch(setPostData(null));
        } else {
            const res = await PostApi.fetchPosts();
            dispatch(setPostData(res.data));
        }
    } catch (err) {
        console.log(err);
        dispatch(setPostData(null));
    }
};

export const addNewPost = (newPost) => async (dispatch) => {
    try {
        await PostApi.addNewPost(newPost);
        dispatch(fetchPosts());
    } catch (err) {
        console.log(err);
    }
}

export default PostReducer;
