import {LoginReduxForm} from "./Login";
import {connect} from "react-redux";
import {signIn} from "../../Redux/Reducers/AuthReducer";

const LoginContainer = (props) => {

    const handleSubmit = (formData) => {
        props.signIn(formData.username, formData.password);
    }

    return (
        <LoginReduxForm onSubmit={handleSubmit}/>
    )
}

const mapStateToProps = (state) => ({})
const actionCreators = {
    signIn
}

export default connect(mapStateToProps, actionCreators)(LoginContainer);