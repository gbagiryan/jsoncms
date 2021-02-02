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
                    <ListItemText primary={'MyPosts'}/>
                </ListItem>
                <ListItem button key={'addPost'} component={Link} to={'/add_post'}>
                    <ListItemIcon><AddCircleIcon/></ListItemIcon>
                    <ListItemText primary={'Add New Post'}/>
                </ListItem>
                {props.posts
                    ? props.posts.map((post) => (
                        <ListItem button key={post.name}>
                            <ListItemIcon><EmojiObjectsIcon/></ListItemIcon>
                            <ListItemText primary={post.name}/>
                        </ListItem>))
                    : null}
            </List>
            <Divider/>
        </Paper>
    )
};

export default SideBar;