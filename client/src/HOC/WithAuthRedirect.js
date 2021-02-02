import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {isAuthed} from "../Redux/Selectors/AuthSelectors";

function mapStateToProps(state) {
    return ({
        isAuthed: isAuthed(state)
    });
}

export const WithAuthRedirect = (Component) => {

    const withRedirectComponent = (props) => {
        if (!props.isAuthed) {
            return <Redirect to={'/login'}/>
        }
        return <Component {...props}/>;
    }
    return connect(mapStateToProps)(withRedirectComponent);

};