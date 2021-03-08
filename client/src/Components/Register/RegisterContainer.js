import Register from './Register';
import { signUp } from '../../Redux/Reducers/AuthReducer';
import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { isAuthed } from '../../Redux/Selectors/AuthSelectors';
import { getErrorMsg, getSuccessMsg } from '../../Redux/Selectors/AppSelectors';
import { clearMessages, setErrorMsg } from '../../Redux/Reducers/AppReducer';

const RegisterContainer = (props) => {
  const [inputs, setInputs] = useState({ username: '', password: '', password2: '' });
  const [invalidFields, setInvalidFields] = useState({ username: '', password: '', password2: '' });

  useEffect(() => {
    return () => {
      props.clearMessages();
    };
  }, []);

  const handleInput = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    setInvalidFields({ ...invalidFields, ...{ [e.target.name]: '' } });
  };

  const validate = (e, label, validations) => {
    setInvalidFields({
      ...invalidFields, ...{
        [e.target.name]: validations.map((errsFor) =>
          errsFor(label, inputs[e.target.name]))
          .filter(errMsg => errMsg.length > 0)
      }
    });
  };

  const handleSubmit = () => {
    props.clearMessages();
    props.signUp(inputs.username, inputs.password);
  };

  if (props.isAuthed) {
    return <Redirect to={'/'}/>;
  }
  return (
    <Register
      errorMsg={props.errorMsg}
      successMsg={props.successMsg}
      handleSubmit={handleSubmit}
      handleInput={handleInput}
      validate={validate}
      inputs={inputs}
      invalidFields={invalidFields}
    />
  );
};

const mapStateToProps = (state) => ({
  isAuthed: isAuthed(state),
  errorMsg: getErrorMsg(state),
  successMsg: getSuccessMsg(state)
});
const actionCreators = {
  signUp,
  clearMessages,
  setErrorMsg
};

export default connect(mapStateToProps, actionCreators)(RegisterContainer);
