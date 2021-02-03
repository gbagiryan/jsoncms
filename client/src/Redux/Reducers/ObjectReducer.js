import {ObjectApi} from "../../API/api";

const POST_SET_OBJECT_DATA = 'POST_SET_OBJECT_DATA';

const initialState = {
    objects: null
};

const ObjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_SET_OBJECT_DATA:
            return {
                ...state,
                objects: action.objectData
            }
        default:
            return state;
    }
};
//action creators
const setObjectData = (objectData) => ({type: POST_SET_OBJECT_DATA, objectData});

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

export const addNewObject = (newObject) => async (dispatch) => {
    try {
        await ObjectApi.addNewObject(newObject);
        dispatch(fetchObjects());
    } catch (err) {
        console.log(err);
    }
}

export default ObjectReducer;
