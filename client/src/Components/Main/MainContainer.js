import { compose } from 'redux';
import { WithAuthRedirect } from '../../Common/WithAuthRedirect';
import Main from './Main';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getSingleObjData } from '../../Redux/Selectors/ObjSelectors';
import { deleteObj } from '../../Redux/Reducers/ObjReducer';
import SimpleRecursiveFormContainer from '../ObjForm/SimpleRecursiveFormContainer';
import EditForm from '../ObjForm/EditForm';
import Form from '../Form/Form';

const MainContainer = (props) => {
  const handleSubmit = () => {
    // props.clearMessages();
    console.log(objs);
    // const newObj = {
    //   objs,
    //   name: name,
    //   tags: tagsArr
    // };
    // props.addNewObj(newObj);
  };
  useEffect(() => {
    if (props.obj) {
      console.log('inside init obj');
      setInitialObjs({ ...props.obj.objs });
    }
  }, [props.obj]);

  const [objs, setObjs] = useState({});
  const [initialObjs, setInitialObjs] = useState();

  const setBaseObj = (subObjs) => {
    setObjs({ ...subObjs });
  };
  const handleDeleteObj = () => {
    props.deleteObj(props.obj._id);
  };

  return (
    <EditForm handleChangeParent={setBaseObj}
              handleSubmit={handleSubmit}
              initialObjs={initialObjs}
              handleDeleteObj={handleDeleteObj}/>
  );
};

const mapStateToProps = (state) => ({
  obj: getSingleObjData(state)
});
const actionCreators = {
  deleteObj
};

export default compose(
  connect(mapStateToProps, actionCreators),
  WithAuthRedirect
)(MainContainer);
