import {AppBar, Button, makeStyles, Toolbar, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import React from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}))

const Header = (props) => {
    const classes = useStyles();

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography component={Link} to={'/'} variant="h6" className={classes.title}>
                        JSON CMS
                    </Typography>
                    {props.isAuthed
                        ? <Button onClick={props.handleClick} color="inherit">Logout</Button>
                        : <>
                            <Button component={Link} to={'/login'} color="inherit">Login</Button>
                            <Button component={Link} to={'/register'} color="inherit">Register</Button>
                        </>
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
};

export default Header;
