import { connect } from 'react-redux';
import { addNewObj } from '../../Redux/Reducers/ObjReducer';
import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { WithAuthRedirect } from '../../Common/WithAuthRedirect';
import { getErrorMsg, getSuccessMsg } from '../../Redux/Selectors/AppSelectors';
import { clearMessages, setErrorMsg } from '../../Redux/Reducers/AppReducer';
import AddNewObjForm from './AddNewObjForm';
import AddObjForm from './AddObjForm';
import FormContainer from '../simpleRecursiveForm/FormContainer';

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

  const [objs, setObjs] = useState({});

  const handleSubmit = () => {
    props.clearMessages();
    const newObj = {
      objs,
      name: name,
      tags: tagsArr
    };
    props.addNewObj(newObj);
  };

  const setBaseObj = (subObjs) => {
    setObjs({ ...subObjs });
  };

  return (
    <FormContainer/>
    // <AddObjForm
    //   errorMsg={props.errorMsg}
    //   successMsg={props.successMsg}
    //   setErrorMsg={props.setErrorMsg}
    //   clearMessages={props.clearMessages}
    //   tagsArr={tagsArr}
    //   handleTagChange={handleTagChange}
    //   handleAddTag={handleAddTag}
    //   handleDeleteTag={handleDeleteTag}
    //   name={name}
    //   handleNameChange={handleNameChange}
    //   handleChangeParent={setBaseObj}
    //   handleSubmit={handleSubmit}
    // />
    // <AddNewObjForm
    //   errorMsg={props.errorMsg}
    //   successMsg={props.successMsg}
    //   setErrorMsg={props.setErrorMsg}
    //   clearMessages={props.clearMessages}
    //   tagsArr={tagsArr}
    //   handleTagChange={handleTagChange}
    //   handleAddTag={handleAddTag}
    //   handleDeleteTag={handleDeleteTag}
    //   name={name}
    //   handleNameChange={handleNameChange}
    //   handleChangeParent={setBaseObj}
    //   handleSubmit={handleSubmit}
    // />
  );
};

const mapStateToProps = (state) => ({
  errorMsg: getErrorMsg(state),
  successMsg: getSuccessMsg(state)
});
const actionCreators = {
  addNewObj,
  clearMessages,
  setErrorMsg
};

export default compose(
  connect(mapStateToProps, actionCreators),
  WithAuthRedirect
)(AddNewObjContainer);
