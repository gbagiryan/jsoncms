import {compose} from "redux";
import {WithAuthRedirect} from "../../HOC/WithAuthRedirect";
import Main from "./Main";
import React from "react";

const MainContainer = () => {
    return(
        <Main/>
    )
};

export default compose(WithAuthRedirect)(MainContainer);