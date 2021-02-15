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
      // SetFieldsArr(props.object.fields)
      SetTagsArr(props.object.tags);
    }
  }, [props.object]);

  const inputTypes = [
    { value: 'string', label: 'string' },
    { value: 'rich-text', label: 'rich-text' },
    { value: 'file', label: 'file' },
    { value: 'array', label: 'array' },
    { value: 'object', label: 'object' }
  ];

  const [Name, SetName] = useState('');
  const [Tag, SetTag] = useState('');
  const [TagsArr, SetTagsArr] = useState([]);

  const handleTagChange = (e) => {
    props.clearMessages();
    SetTag(e.target.value);
  };
  const handleNameChange = (e) => {
    props.clearMessages();
    SetName(e.target.value);
  };
  const handleAddTag = () => {
    if (Tag) {
      if (!TagsArr.includes(Tag)) {
        SetTagsArr([...TagsArr, Tag]);
      } else {
        props.setErrorMsg('Tags must be unique');
      }
    } else {
      props.setErrorMsg('Tag can\'t be empty');
    }
  };

  // const handleDeleteField = (index) => {
  //   SetFieldsArr(FieldsArr.filter((field) => FieldsArr.indexOf(field) !== index))
  // }
  const handleDeleteTag = (index) => {
    SetTagsArr(TagsArr.filter((tag) => TagsArr.indexOf(tag) !== index));
  };
  const [Objects, SetObject] = useState([]);

  const handleChangeObjects = (SubObjects) => {
    SetObject([{ ...SubObjects }]);
  };

  const handleSubmit = (formData) => {
    props.clearMessages();

    const updatedObject = {
      name: Name,
      fields: Objects,
      tags: TagsArr
    };
    props.updateObject(props.object._id, updatedObject);
  };

  return (
    <ObjectForm errorMsg={props.errorMsg} successMsg={props.successMsg} onSubmit={handleSubmit}
                handleAddTag={handleAddTag} TagsArr={TagsArr} handleTagChange={handleTagChange}
                Name={Name} handleNameChange={handleNameChange} handleDeleteTag={handleDeleteTag}
                handleChangeObjects={handleChangeObjects} Objects={Objects}/>
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
