import { RegisterReduxForm } from './Register';
import { signUp } from '../../Redux/Reducers/AuthReducer';
import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { isAuthed } from '../../Redux/Selectors/AuthSelectors';
import { getErrorMsg, getSuccessMsg } from '../../Redux/Selectors/AppSelectors';
import { clearMessages } from '../../Redux/Reducers/AppReducer';

const RegisterContainer = (props) => {

  useEffect(() => {
    return () => {
      props.clearMessages();
    };
  }, []);

  const handleSubmit = (formData) => {
    props.clearMessages();
    props.signUp(formData.username, formData.password);
  };
  if (props.isAuthed) {
    return <Redirect to={'/'}/>;
  }
  return (
    <RegisterReduxForm onSubmit={handleSubmit} errorMsg={props.errorMsg} successMsg={props.successMsg}/>
  );
};

const mapStateToProps = (state) => ({
  isAuthed: isAuthed(state),
  errorMsg: getErrorMsg(state),
  successMsg: getSuccessMsg(state)
});
const actionCreators = {
  signUp,
  clearMessages
};

export default connect(mapStateToProps, actionCreators)(RegisterContainer);