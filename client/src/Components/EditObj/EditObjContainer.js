import { singleObjData } from '../../Redux/Selectors/ObjSelectors';
import { fetchAnObj, updateObj } from '../../Redux/Reducers/ObjReducer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { WithAuthRedirect } from '../../Common/WithAuthRedirect';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { getErrorMsg, getSuccessMsg } from '../../Redux/Selectors/AppSelectors';
import { clearMessages, setErrorMsg } from '../../Redux/Reducers/AppReducer';
import ObjForm from '../ObjForm/ObjForm';

const EditObjContainer = (props) => {

  useEffect(() => {
    return () => {
      props.clearMessages();
    };
  }, []);

  useEffect(() => {
    const objId = props.match.params.objId;
    props.fetchAnObj(objId);
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

  const handleSubmit = (formData) => {
    props.clearMessages();

    const updatedObj = {
      objs,
      name: name,
      tags: tagsArr
    };
    props.updateObj(props.obj._id, updatedObj);
  };

  return (
    <ObjForm errorMsg={props.errorMsg}
             successMsg={props.successMsg}
             setErrorMsg={props.setErrorMsg}
             clearMessages={props.clearMessages}
             handleSubmit={handleSubmit}
             handleAddTag={handleAddTag}
             tagsArr={tagsArr}
             handleTagChange={handleTagChange}
             name={name}
             handleNameChange={handleNameChange}
             handleDeleteTag={handleDeleteTag}
             setParentValue={setBaseObj}
             existingObjs={props.obj}
    />
  );
};

const mapStateToProps = (state) => ({
  obj: singleObjData(state),
  errorMsg: getErrorMsg(state),
  successMsg: getSuccessMsg(state)
});
const actionCreators = {
  updateObj,
  fetchAnObj,
  clearMessages,
  setErrorMsg
};

export default compose(
  withRouter,
  connect(mapStateToProps, actionCreators),
  WithAuthRedirect
)(EditObjContainer);
