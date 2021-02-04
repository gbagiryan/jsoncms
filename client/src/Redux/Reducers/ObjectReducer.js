import {ObjectApi} from "../../API/api";
import {setErrorMsg, setSuccessMsg} from "./AppReducer";

const POST_SET_OBJECT_DATA = 'POST_SET_OBJECT_DATA';
const POST_SET_SINGLE_OBJECT_DATA = 'POST_SET_SINGLE_OBJECT_DATA';

const initialState = {
    objects: null,
    singleObject: null
};

const ObjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_SET_OBJECT_DATA:
            return {
                ...state,
                objects: action.objectData
            }
        case POST_SET_SINGLE_OBJECT_DATA:
            return {
                ...state,
                singleObject: action.singleObjectData
            }
        default:
            return state;
    }
};
//action creators
export const setObjectData = (objectData) => ({type: POST_SET_OBJECT_DATA, objectData});
export const setSingleObjectData = (singleObjectData) => ({type: POST_SET_SINGLE_OBJECT_DATA, singleObjectData});

//thunks
export const fetchObjects = (isAuthed) => async (dispatch) => {
    try {
        if (!isAuthed) {
            dispatch(setObjectData(null));
        } else {
            const res = await ObjectApi.fetchObjects();
            dispatch(setObjectData(res.data));
        }
    } catch (err) {
        console.log(err);
        dispatch(setObjectData(null));
        dispatch(setErrorMsg(err.response.data.errorMessage));
    }
};

export const fetchAnObject = (objectId) => async (dispatch) => {
    try {
        const res = await ObjectApi.fetchAnObject(objectId);
        dispatch(setSingleObjectData(res.data));
    } catch (err) {
        console.log(err);
        dispatch(setSingleObjectData(null));
        dispatch(setErrorMsg(err.response.data.errorMessage));
    }
};

export const addNewObject = (newObject) => async (dispatch) => {
    try {
        const res = await ObjectApi.addNewObject(newObject);
        dispatch(fetchObjects(true));
        dispatch(setSuccessMsg(res.data.successMessage));
    } catch (err) {
        console.log(err);
        dispatch(setErrorMsg(err.response.data.errorMessage));
    }
};

export const updateObject = (objectId, updatedObject) => async (dispatch) => {
    try {
        const res = await ObjectApi.updateObject(objectId, updatedObject);
        dispatch(fetchObjects(true));
        dispatch(setSuccessMsg(res.data.successMessage));
    } catch (err) {
        console.log(err);
        dispatch(setErrorMsg(err.response.data.errorMessage));
    }
};
export const deleteObject = (objectId) => async (dispatch) => {
    try {
        const res = await ObjectApi.deleteObject(objectId);
        dispatch(setSingleObjectData(null));
        dispatch(fetchObjects(true));
    } catch (err) {
        console.log(err);
        dispatch(setErrorMsg(err.response.data.errorMessage));
    }
};
export const getObjectsByTag = (tags) => async (dispatch) => {
    try {
        const res = await ObjectApi.getObjectsByTag(tags);
        dispatch(setObjectData(res.data));
    } catch (err) {
        console.log(err);
        dispatch(setErrorMsg(err.response.data.errorMessage));
    }
};

export default ObjectReducer;
