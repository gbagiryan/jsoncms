import { ObjApi } from '../../API/api';
import { setErrorMsg, setSuccessMsg } from './AppReducer';

const OBJ_SET_OBJ_DATA = 'OBJ_SET_OBJ_DATA';
const OBJ_SET_SINGLE_OBJ_DATA = 'OBJ_SET_SINGLE_OBJ_DATA';

const initialState = {
  objs: null,
  singleObj: null
};

const ObjReducer = (state = initialState, action) => {
  switch (action.type) {
    case OBJ_SET_OBJ_DATA:
      return {
        ...state,
        objs: action.objData
      };
    case OBJ_SET_SINGLE_OBJ_DATA:
      return {
        ...state,
        singleObj: action.singleObjData
      };
    default:
      return state;
  }
};

//action creators
export const setObjData = (objData) => ({ type: OBJ_SET_OBJ_DATA, objData });
export const setSingleObjData = (singleObjData) => ({ type: OBJ_SET_SINGLE_OBJ_DATA, singleObjData });

//thunks
export const fetchObjs = (isAuthed) => async (dispatch) => {
  try {
    if (!isAuthed) {
      dispatch(setObjData(null));
    } else {
      const res = await ObjApi.fetchObjs();
      dispatch(setObjData(res.data));
    }
  } catch (err) {
    console.log(err);
    dispatch(setObjData(null));
    dispatch(setErrorMsg(err.response.data.errorMessage));
  }
};

export const fetchAnObj = (objId) => async (dispatch) => {
  try {
    const res = await ObjApi.fetchAnObj(objId);
    dispatch(setSingleObjData(res.data));
  } catch (err) {
    console.log(err);
    dispatch(setSingleObjData(null));
    dispatch(setErrorMsg(err.response.data.errorMessage));
  }
};

export const addNewObj = (newObj) => async (dispatch) => {
  try {
    const res = await ObjApi.addNewObj(newObj);
    dispatch(fetchObjs(true));
    dispatch(setSuccessMsg(res.data.successMessage));
  } catch (err) {
    console.log(err);
    dispatch(setErrorMsg(err.response.data.errorMessage));
  }
};

export const updateObj = (objId, updatedObj) => async (dispatch) => {
  try {
    const res = await ObjApi.updateObj(objId, updatedObj);
    dispatch(fetchObjs(true));
    dispatch(setSuccessMsg(res.data.successMessage));
  } catch (err) {
    console.log(err);
    dispatch(setErrorMsg(err.response.data.errorMessage));
  }
};
export const deleteObj = (objId) => async (dispatch) => {
  try {
    await ObjApi.deleteObj(objId);
    dispatch(setSingleObjData(null));
    dispatch(fetchObjs(true));
  } catch (err) {
    console.log(err);
    dispatch(setErrorMsg(err.response.data.errorMessage));
  }
};
export const getObjsByTag = (tags) => async (dispatch) => {
  try {
    const res = await ObjApi.getObjsByTag(tags);
    dispatch(setObjData(res.data));
  } catch (err) {
    console.log(err);
    dispatch(setErrorMsg(err.response.data.errorMessage));
  }
};

export default ObjReducer;
