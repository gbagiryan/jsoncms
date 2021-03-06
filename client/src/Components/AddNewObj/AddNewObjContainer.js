import { connect } from 'react-redux';
import { addNewObj } from '../../Redux/Reducers/ObjReducer';
import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { WithAuthRedirect } from '../../Common/WithAuthRedirect';
import { getErrorMsg, getSuccessMsg } from '../../Redux/Selectors/AppSelectors';
import { clearMessages, setErrorMsg } from '../../Redux/Reducers/AppReducer';
import FormContainer from '../RecursiveForm/FormContainer';
import { WithToasts } from '../../Common/WithToasts';

const AddNewObjContainer = (props) => {
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

  const handleSubmit = (objs) => {
    props.clearMessages();
    const newObj = {
      objs,
      name: name,
      tags: tagsArr
    };
    props.addNewObj(newObj);
  };

  return (
    <FormContainer
      errorMsg={props.errorMsg}
      successMsg={props.successMsg}
      setErrorMsg={props.setErrorMsg}
      clearMessages={props.clearMessages}
      tagsArr={tagsArr}
      handleTagChange={handleTagChange}
      handleAddTag={handleAddTag}
      handleDeleteTag={handleDeleteTag}
      name={name}
      handleNameChange={handleNameChange}
      handleSubmit={handleSubmit}
    />
  );
};

const mapStateToProps = (state) => ({
});
const actionCreators = {
  addNewObj,
  clearMessages,
  setErrorMsg
};

export default compose(
  connect(mapStateToProps, actionCreators),
  WithToasts,
  WithAuthRedirect
)(AddNewObjContainer);
