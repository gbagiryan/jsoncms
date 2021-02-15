import { connect } from 'react-redux';
import { addNewObject } from '../../Redux/Reducers/ObjectReducer';
import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { WithAuthRedirect } from '../../Common/WithAuthRedirect';
import { getErrorMsg, getSuccessMsg } from '../../Redux/Selectors/AppSelectors';
import { clearMessages, setErrorMsg } from '../../Redux/Reducers/AppReducer';
import ObjectForm from '../ObjectForm/ObjectForm';

const AddNewObjectContainer = (props) => {
  const [name, setName] = useState('');
  const [tag, setTag] = useState('');
  const [tagsArr, setTagsArr] = useState([]);

  useEffect(() => {
    return () => {
      props.clearMessages();
    };
  }, []);

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

  const [Objects, SetObject] = useState({});

  const parentCallback = (SubObjects) => {
    SetObject({ ...SubObjects });
  };

  useEffect(() => {
    console.log(Objects);
  }, [Objects]);

  const handleSubmit = () => {
    props.clearMessages();
    const newObject = {
      name: name,
      fields: Objects,
      tags: tagsArr
    };
    props.addNewObject(newObject);
  };

  return (
    <ObjectForm
      errorMsg={props.errorMsg}
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
      parentCallback={parentCallback}
    />
  );
};

const mapStateToProps = (state) => ({
  errorMsg: getErrorMsg(state),
  successMsg: getSuccessMsg(state)
});
const actionCreators = {
  addNewObject,
  clearMessages,
  setErrorMsg
};

export default compose(
  connect(mapStateToProps, actionCreators),
  WithAuthRedirect
)(AddNewObjectContainer);
