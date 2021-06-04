import React, {useState} from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import ReactQuill from 'react-quill';
import Dialog from '@material-ui/core/Dialog';
import ReactHtmlParser from 'react-html-parser';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const useStyles = makeStyles((theme) => ({
    popover: {
        pointerEvents: 'none',
        height: 300,
        width: 400,
    },
    paper: {
        padding: theme.spacing(1),
    },
    root: {
        '& .MuiDialog-paperWidthSm': {
            maxWidth: 'none'
        }
    },
    rtfEditor: {
        height: 500,
        width: 800,
    },
    rtfButton: {
        marginTop: theme.spacing(-2),
        marginLeft: theme.spacing(1)
    }
}));

const DialogTitle = withStyles(styles)((props) => {
    const {children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const RtxDialogWithHoverPopover = (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const openPopover = Boolean(anchorEl);

    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };
    const handleClose = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}
                    className={classes.rtfButton}
                    aria-owns={openPopover ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
            >
                Open Editor
            </Button>
            {props.value &&
            <Popover
                id="mouse-over-popover"
                className={classes.popover}
                classes={{
                    paper: classes.paper,
                }}
                open={openPopover}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                {ReactHtmlParser(props.value)}
            </Popover>
            }

            <Dialog className={classes.root} onClose={handleClose} aria-labelledby="customized-dialog-title"
                    open={openDialog}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    RTF Editor
                </DialogTitle>
                <DialogContent dividers>
                    {props.readOnly ?
                        <ReactQuill
                            className={classes.rtfEditor}
                            value={props.value}
                            readOnly={props.readOnly}
                        />
                        : <ReactQuill
                            className={classes.rtfEditor}
                            value={props.value}
                            readOnly={props.readOnly}
                            onChange={(html) => props.handleChildInput({
                                target: {
                                    value: html,
                                    name: '__value'
                                }
                            }, props.index)}
                        />
                    }
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default RtxDialogWithHoverPopover;
