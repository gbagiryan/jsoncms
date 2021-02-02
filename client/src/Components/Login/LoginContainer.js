import {LoginReduxForm} from "./Login";
import {connect} from "react-redux";
import {signIn} from "../../Redux/Reducers/AuthReducer";
import React from "react";
import {Redirect} from "react-router-dom";
import {isAuthed} from "../../Redux/Selectors/AuthSelectors";

const LoginContainer = (props) => {

    const handleSubmit = (formData) => {
        props.signIn(formData.username, formData.password);
    }
    if (props.isAuthed) {
        return <Redirect to={'/'}/>
    }
    return (
        <LoginReduxForm onSubmit={handleSubmit}/>
    )
}

const mapStateToProps = (state) => ({
    isAuthed: isAuthed(state)
});
const actionCreators = {
    signIn
};

export default connect(mapStateToProps, actionCreators)(LoginContainer);