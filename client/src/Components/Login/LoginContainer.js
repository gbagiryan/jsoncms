import Login from './Login';
import { connect } from 'react-redux';
import { signIn } from '../../Redux/Reducers/AuthReducer';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { isAuthed } from '../../Redux/Selectors/AuthSelectors';
import { getErrorMsg, getSuccessMsg } from '../../Redux/Selectors/AppSelectors';
import { clearMessages, setErrorMsg } from '../../Redux/Reducers/AppReducer';
import Register from '../Register/Register';

const LoginContainer = (props) => {

  const [inputs, setInputs] = useState({ username: '', password: '' });

  useEffect(() => {
    return () => {
      props.clearMessages();
    };
  }, []);

  const handleInput = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    props.clearMessages();
      props.signIn(inputs.username, inputs.password);
  };

  if (props.isAuthed) {
    return <Redirect to={'/'}/>;
  }
  return (
    <Login errorMsg={props.errorMsg}
           successMsg={props.successMsg}
           handleInput={handleInput}
           handleSubmit={handleSubmit}
           inputs={inputs}
    />
  );
};

const mapStateToProps = (state) => ({
  isAuthed: isAuthed(state),
  errorMsg: getErrorMsg(state),
  successMsg: getSuccessMsg(state)
});
const actionCreators = {
  signIn,
  clearMessages,
  setErrorMsg
};

export default connect(mapStateToProps, actionCreators)(LoginContainer);
