import { LoginReduxForm } from './Login';
import { connect } from 'react-redux';
import { signIn } from '../../Redux/Reducers/AuthReducer';
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { isAuthed } from '../../Redux/Selectors/AuthSelectors';
import { getErrorMsg, getSuccessMsg } from '../../Redux/Selectors/AppSelectors';
import { clearMessages } from '../../Redux/Reducers/AppReducer';

const LoginContainer = (props) => {

  useEffect(() => {
    return () => {
      props.clearMessages();
    };
  }, []);

  const handleSubmit = (formData) => {
    props.clearMessages();
    props.signIn(formData.username, formData.password);
  };
  if (props.isAuthed) {
    return <Redirect to={'/'}/>;
  }
  return (
    <LoginReduxForm onSubmit={handleSubmit} errorMsg={props.errorMsg} successMsg={props.successMsg}/>
  );
};

const mapStateToProps = (state) => ({
  isAuthed: isAuthed(state),
  errorMsg: getErrorMsg(state),
  successMsg: getSuccessMsg(state)
});
const actionCreators = {
  signIn,
  clearMessages
};

export default connect(mapStateToProps, actionCreators)(LoginContainer);