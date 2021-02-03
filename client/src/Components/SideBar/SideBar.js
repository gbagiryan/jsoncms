import {
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles, Paper
} from "@material-ui/core";
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {Link} from "react-router-dom";
import React from "react";


const useStyles = makeStyles({
    paper: {
        minHeight: '100vh',
    },
    sidebarHead: {
        backgroundColor: "#3f51b5",
        color: "white"
    }
});

const SideBar = (props) => {
    const classes = useStyles();

    return (
        <Paper elevation={4} className={classes.paper}>
            <List>
                <ListItem key={'head'} className={classes.sidebarHead}>
                    <ListItemText primary={'My Objects'}/>
                </ListItem>
                <ListItem button key={'addObject'} component={Link} to={'/add_object'}>
                    <ListItemIcon><AddCircleIcon/></ListItemIcon>
                    <ListItemText primary={'Add New Object'}/>
                </ListItem>
                <Divider/>
                {props.objects
                    ? props.objects.map((object) => (
                        <ListItem button key={object.name}>
                            <ListItemIcon><EmojiObjectsIcon/></ListItemIcon>
                            <ListItemText primary={object.name}/>
                        </ListItem>))
                    : null}
            </List>
        </Paper>
    )
};

export default SideBar;