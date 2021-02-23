import { getSingleObjData } from '../../Redux/Selectors/ObjSelectors';
import { updateObj } from '../../Redux/Reducers/ObjReducer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { WithAuthRedirect } from '../../Common/WithAuthRedirect';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { getErrorMsg, getSuccessMsg } from '../../Redux/Selectors/AppSelectors';
import { clearMessages, setErrorMsg } from '../../Redux/Reducers/AppReducer';

const EditObjContainer = (props) => {

  useEffect(() => {
    return () => {
      props.clearMessages();
    };
  }, []);

  useEffect(() => {
    if (props.obj) {
      setTagsArr(props.obj.tags);
    }
  }, [props.obj]);

  const [name, setName] = useState('');
  const [tag, setTag] = useState('');
  const [tagsArr, setTagsArr] = useState([]);

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

  const [objs, setObjs] = useState([]);

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
    console.log(props);
    props.updateObj(props.obj._id, updatedObj);
  };

  return (
    <div></div>
  );
};

const mapStateToProps = (state) => ({
  obj: getSingleObjData(state),
  errorMsg: getErrorMsg(state),
  successMsg: getSuccessMsg(state)
});
const actionCreators = {
  updateObj,
  clearMessages,
  setErrorMsg
};

export default compose(
  withRouter,
  connect(mapStateToProps, actionCreators),
  WithAuthRedirect
)(EditObjContainer);
