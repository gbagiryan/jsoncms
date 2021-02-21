import { connect } from 'react-redux';
import { addNewObj } from '../../Redux/Reducers/ObjReducer';
import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { WithAuthRedirect } from '../../Common/WithAuthRedirect';
import { getErrorMsg, getSuccessMsg } from '../../Redux/Selectors/AppSelectors';
import { clearMessages, setErrorMsg } from '../../Redux/Reducers/AppReducer';
import ObjForm from '../ObjForm/ObjForm';
import ObjTreeForm from '../ObjForm/ObjTreeForm';
import RecursiveTreeForm from '../ObjForm/RecursiveTreeForm';
import NewRecursiveForm from '../ObjForm/NewRecursiveForm';
import NewForm from '../ObjForm/NewForm';
import SimpleRecursiveFormContainer from '../ObjForm/SimpleRecursiveFormContainer';
import SimpleRecursiveForm from '../ObjForm/SimpleRecursiveForm';

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
    console.log(objs);
    const newObj = {
      objs,
      name: 'name',
      tags: ['tagsArr']
    };
    props.addNewObj(newObj);
  };


  const setBaseObj = (subObjs) => {
    setObjs({ ...subObjs });
  };


  return (
    <SimpleRecursiveFormContainer setParentState={setBaseObj} handleSubmit={handleSubmit}/>
    // <NewForm setParentValue={setBaseObj} handleSubmit={handleSubmit} tagsArr={tagsArr}/>
    // <ObjForm
    //   errorMsg={props.errorMsg}
    //   successMsg={props.successMsg}
    //   setErrorMsg={props.setErrorMsg}
    //   clearMessages={props.clearMessages}
    //   handleSubmit={handleSubmit}
    //   handleAddTag={handleAddTag}
    //   tagsArr={tagsArr}
    //   handleTagChange={handleTagChange}
    //   name={name}
    //   handleNameChange={handleNameChange}
    //   handleDeleteTag={handleDeleteTag}
    //   setParentValue={setBaseObj}
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
