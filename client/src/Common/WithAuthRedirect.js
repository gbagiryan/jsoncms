import { connect } from 'react-redux';
import { isAuthed } from '../Redux/Selectors/AuthSelectors';
import React from 'react';
import { Redirect } from 'react-router-dom';

export const WithAuthRedirect = (Component) => {
  const withRedirectComponent = (props) => {
    if (!props.isAuthed) {
      return <Redirect to={'/login'}/>;
    }
    return <Component {...props}/>;
  };

  const mapStateToProps = (state) => ({
    isAuthed: isAuthed(state)
  });

  return connect(mapStateToProps)(withRedirectComponent);
};
