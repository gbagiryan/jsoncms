import {BrowserRouter, Switch, Route} from "react-router-dom";
import Main from "./Components/Main/MainContainer";
import {Grid, makeStyles, Paper} from "@material-ui/core";
import LoginContainer from "./Components/Login/LoginContainer";
import RegisterContainer from "./Components/Register/RegisterContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import React, {useEffect} from "react";
import {connect} from "react-redux";
import {verifyAuth} from "./Redux/Reducers/AuthReducer";
import {isAuthed} from "./Redux/Selectors/AuthSelectors";
import {fetchPosts} from "./Redux/Reducers/PostReducer";
import SideBarContainer from "./Components/SideBar/SideBarContainer";
import AddNewPostContainer from "./Components/AddNewPost/AddNewPostContainer";

const useStyles = makeStyles({
    paper: {
        minHeight: '100vh'
    }
});

const App = (props) => {
    const classes = useStyles();

    useEffect(() => {
        props.verifyAuth();
    }, [])
    useEffect(() => {
        props.fetchPosts();
    }, [props.isAuthed])

    return (
        <BrowserRouter>
            <Grid container direction={'column'} spacing={1}>
                <Grid item>
                    <HeaderContainer/>
                </Grid>
                <Grid item container spacing={2} xs={12}>
                    <Grid item xs={2}>
                        <SideBarContainer/>
                    </Grid>
                    <Grid item xs={10}>
                        <Paper elevation={4} className={classes.paper}>
                            <Switch>
                                <Route exact path='/' component={Main}/>
                                <Route exact path='/add_post' component={AddNewPostContainer}/>
                                <Route exact path='/login' component={LoginContainer}/>
                                <Route exact path='/register' component={RegisterContainer}/>
                            </Switch>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </BrowserRouter>
    );
}
const mapStateToProps = (state) => ({
    isAuthed: isAuthed(state)
});
const actionCreators = {
    verifyAuth,
    fetchPosts
};
export default connect(mapStateToProps, actionCreators)(App);
