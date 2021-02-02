import {compose} from "redux";
import {WithAuthRedirect} from "../../HOC/WithAuthRedirect";
import Main from "./Main";

const MainContainer = (props) => {
    return(
        <Main/>
    )
};

export default compose(WithAuthRedirect)(MainContainer);