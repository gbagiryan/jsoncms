import './App.css';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Main from "./Components/Main/MainContainer";
import {Grid, makeStyles, Paper} from "@material-ui/core";
import LoginContainer from "./Components/Login/LoginContainer";
import RegisterContainer from "./Components/Register/RegisterContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import React, {useEffect} from "react";
import {connect} from "react-redux";
import {isAuthed} from "./Redux/Selectors/AuthSelectors";
import {fetchObjects} from "./Redux/Reducers/ObjectReducer";
import SideBarContainer from "./Components/SideBar/SideBarContainer";
import AddNewPostContainer from "./Components/AddNewObject/AddNewObjectContainer";
import EditObjectContainer from "./Components/EditObject/EditObjectContainer";
import {initializeApp} from "./Redux/Reducers/AppReducer";
import {isInitialized} from "./Redux/Selectors/AppSelectors";

const useStyles = makeStyles({
    paper: {
        minHeight: '100vh'
    }
});

const App = (props) => {
    const classes = useStyles();

    useEffect(() => {
        props.initializeApp();
    }, [])
    useEffect(() => {
        props.fetchObjects(props.isAuthed);
    }, [props.isAuthed])

    return (
        <BrowserRouter>

            {props.isInitialized &&
            <Grid container direction={'column'} spacing={1}>
                <Grid item>
                    <HeaderContainer/>
                </Grid>
                <Grid item container spacing={2} xs={12}>
                    {props.isAuthed
                        ?
                        <Grid item xs={2}>
                            <SideBarContainer/>
                        </Grid>
                        : null}
                    <Grid item xs={props.isAuthed ? 10 : 12}>
                        <Paper elevation={4} className={classes.paper}>
                            <Switch>
                                <Route exact path='/' component={Main}/>
                                <Route exact path='/add_object' component={AddNewPostContainer}/>
                                <Route exact path='/login' component={LoginContainer}/>
                                <Route exact path='/register' component={RegisterContainer}/>
                                <Route exact path='/edit_object'>
                                    <Redirect to="/"/>
                                </Route>
                                <Route path='/edit_object/:objectId' component={EditObjectContainer}/>
                            </Switch>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
            }
        </BrowserRouter>
    );
}
const mapStateToProps = (state) => ({
    isAuthed: isAuthed(state),
    isInitialized: isInitialized(state)
});
const actionCreators = {
    initializeApp,
    fetchObjects
};
export default connect(mapStateToProps, actionCreators)(App);
