import {ObjectApi} from "../../API/api";

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
const setObjectData = (objectData) => ({type: POST_SET_OBJECT_DATA, objectData});
const setSingleObjectData = (singleObjectData) => ({type: POST_SET_SINGLE_OBJECT_DATA, singleObjectData});

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
    }
};

export const fetchAnObject = (objectId) => async (dispatch) => {
    try {
        const res = await ObjectApi.fetchAnObject(objectId);
        dispatch(setSingleObjectData(res.data));
    } catch (err) {
        console.log(err);
    }
};

export const addNewObject = (newObject) => async (dispatch) => {
    try {
        await ObjectApi.addNewObject(newObject);
        dispatch(fetchObjects(true));
    } catch (err) {
        console.log(err);
    }
};

export const updateObject = (objectId, updatedObject) => async (dispatch) => {
    try {
        await ObjectApi.updateObject(objectId, updatedObject);
        dispatch(fetchObjects(true));
    } catch (err) {
        console.log(err);
    }
};
export const deleteObject = (objectId) => async (dispatch) => {
    try {
        await ObjectApi.deleteObject(objectId);
        dispatch(setSingleObjectData(null));
        dispatch(fetchObjects(true));
    } catch (err) {
        console.log(err);
    }
};
export const getObjectsByTag = (tags) => async (dispatch) => {
    try {
        const res = await ObjectApi.getObjectsByTag(tags);
        dispatch(setObjectData(res.data));
    } catch (err) {
        console.log(err);
    }
};

export default ObjectReducer;
