import { compose } from 'redux';
import { WithAuthRedirect } from '../../Common/WithAuthRedirect';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getSingleObjData } from '../../Redux/Selectors/ObjSelectors';
import { deleteObj, updateObj } from '../../Redux/Reducers/ObjReducer';
import { clearMessages, setErrorMsg } from '../../Redux/Reducers/AppReducer';
import { getErrorMsg, getSuccessMsg } from '../../Redux/Selectors/AppSelectors';
import Main from './Main';

const MainContainer = (props) => {

  useEffect(() => {
    if (props.obj) {
      setInitialObjs({ ...props.obj.objs });
      setName(props.obj.name);
      setTagsArr(props.obj.tags);
      setObjId(props.obj._id);
    }
    return () => {
      props.clearMessages();
    };
  }, [props.obj]);

  const [name, setName] = useState('');
  const [tagsArr, setTagsArr] = useState([]);
  const [objId, setObjId] = useState([]);

  const [initialObjs, setInitialObjs] = useState();
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });

  const handleDeleteObj = (objId) => {
    props.deleteObj(objId);
    setConfirmDialog({ ...confirmDialog, isOpen: false });
  };

  return (
    <div>
      {props.obj ?
        <Main
          errorMsg={props.errorMsg}
          successMsg={props.successMsg}
          setErrorMsg={props.setErrorMsg}
          clearMessages={props.clearMessages}
          initialObjs={initialObjs}
          objId={objId}
          handleDeleteObj={handleDeleteObj}
          tagsArr={tagsArr}
          name={name}
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />

        : <h2>
          Choose an object to display
        </h2>
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  errorMsg: getErrorMsg(state),
  successMsg: getSuccessMsg(state),
  obj: getSingleObjData(state)
});
const actionCreators = {
  deleteObj,
  clearMessages,
  setErrorMsg
};

export default compose(
  connect(mapStateToProps, actionCreators),
  WithAuthRedirect
)(MainContainer);
