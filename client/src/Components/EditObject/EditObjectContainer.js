import { singleObjectData } from '../../Redux/Selectors/ObjectSelectors';
import { fetchAnObject, updateObject } from '../../Redux/Reducers/ObjectReducer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { WithAuthRedirect } from '../../Common/WithAuthRedirect';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { getErrorMsg, getSuccessMsg } from '../../Redux/Selectors/AppSelectors';
import { clearMessages, setErrorMsg } from '../../Redux/Reducers/AppReducer';
import ObjectForm from '../ObjectForm/ObjectForm';

const EditObjectContainer = (props) => {

  useEffect(() => {
    return () => {
      props.clearMessages();
    };
  }, []);

  useEffect(() => {
    const objectId = props.match.params.objectId;
    props.fetchAnObject(objectId);
  }, []);

  useEffect(() => {
    if (props.object) {
      setTagsArr(props.object.tags);
    }
  }, [props.object]);

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
  const [fields, setFields] = useState([]);

  const setBaseObject = (subObjects) => {
    setFields({ ...subObjects });
  };

  const handleSubmit = (formData) => {
    props.clearMessages();

    const updatedObject = {
      name: name,
      fields: fields,
      tags: tagsArr
    };
    props.updateObject(props.object._id, updatedObject);
  };

  return (
    <ObjectForm errorMsg={props.errorMsg}
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
                setParentValue={setBaseObject}
                existingObjs={props.object}
    />
  );
};

const mapStateToProps = (state) => ({
  object: singleObjectData(state),
  errorMsg: getErrorMsg(state),
  successMsg: getSuccessMsg(state)
});
const actionCreators = {
  updateObject,
  fetchAnObject,
  clearMessages,
  setErrorMsg
};

export default compose(
  withRouter,
  connect(mapStateToProps, actionCreators),
  WithAuthRedirect
)(EditObjectContainer);
