import { useToasts } from 'react-toast-notifications';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { clearMessages } from '../Redux/Reducers/AppReducer';
import { getErrorMsg, getSuccessMsg } from '../Redux/Selectors/AppSelectors';

export const WithToasts = (Component) => {
  const WithToastsComponent = (props) => {
    const { addToast } = useToasts();

    useEffect(() => {
      if (!!props.errorMsg) {
        props.clearMessages();
        addToast(props.errorMsg, { appearance: 'error' });
      }
    }, [props.errorMsg]);

    useEffect(() => {
      if (!!props.successMsg) {
        props.clearMessages();
        addToast(props.successMsg, { appearance: 'success' });
      }
    }, [props.successMsg]);

    return <Component {...props}/>;
  };
  const mapStateToProps = (state) => ({
    errorMsg: getErrorMsg(state),
    successMsg: getSuccessMsg(state)
  });
  const actionCreators = {
    clearMessages
  };
  return connect(mapStateToProps, actionCreators)(WithToastsComponent);
};