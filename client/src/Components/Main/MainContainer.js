import { compose } from 'redux';
import { WithAuthRedirect } from '../../Common/WithAuthRedirect';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getSingleObjData } from '../../Redux/Selectors/ObjSelectors';
import { deleteObj, updateObj } from '../../Redux/Reducers/ObjReducer';
import EditObjForm from '../EditObj/EditObjForm';
import { clearMessages, setErrorMsg } from '../../Redux/Reducers/AppReducer';
import { getErrorMsg, getSuccessMsg } from '../../Redux/Selectors/AppSelectors';

const MainContainer = (props) => {

  useEffect(() => {
    if (props.obj) {
      setInitialObjs({ ...props.obj.objs });
      setName(props.obj.name)
      setTagsArr(props.obj.tags)
    }
    return () => {
      props.clearMessages();
    };
  }, [props.obj]);

  const [name, setName] = useState('');
  const [tag, setTag] = useState('');
  const [tagsArr, setTagsArr] = useState([]);

  const [objs, setObjs] = useState({});
  const [initialObjs, setInitialObjs] = useState();

  const handleTagChange = (e) => {
    props.clearMessages();
    setTag(e.target.value);
  };
  const handleNameChange = (e) => {
    props.clearMessages();
    setName(e.target.value);
  };

  const handleAddTag = () => {
    if (tag) {
      if (!tagsArr.includes(tag)) {
        setTagsArr([...tagsArr, tag]);
      } else {
        props.setErrorMsg('Tags must be unique');
      }
    } else {
      props.setErrorMsg('Tag can\'t be empty');
    }
  };
  const handleDeleteTag = (index) => {
    setTagsArr(tagsArr.filter((tag) => tagsArr.indexOf(tag) !== index));
  };

  const handleDeleteObj = () => {
    props.deleteObj(props.obj._id);
  };

  const setBaseObj = (subObjs) => {
    setObjs({ ...subObjs });
  };

  const handleSubmit = () => {
    props.clearMessages();
    const updatedObj = {
      objs,
      name: name,
      tags: tagsArr
    };
    props.updateObj(props.obj._id, updatedObj);
  };

  return (
    <EditObjForm
      errorMsg={props.errorMsg}
      successMsg={props.successMsg}
      setErrorMsg={props.setErrorMsg}
      clearMessages={props.clearMessages}
      handleChangeParent={setBaseObj}
      handleSubmit={handleSubmit}
      initialObjs={initialObjs}
      handleDeleteObj={handleDeleteObj}
      tagsArr={tagsArr}
      handleAddTag={handleAddTag}
      handleTagChange={handleTagChange}
      name={name}
      handleNameChange={handleNameChange}
      handleDeleteTag={handleDeleteTag}
    />
  );
};

const mapStateToProps = (state) => ({
  errorMsg: getErrorMsg(state),
  successMsg: getSuccessMsg(state),
  obj: getSingleObjData(state)
});
const actionCreators = {
  updateObj,
  deleteObj,
  clearMessages,
  setErrorMsg
};

export default compose(
  connect(mapStateToProps, actionCreators),
  WithAuthRedirect
)(MainContainer);
