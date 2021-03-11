import React from 'react';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import PermMediaIcon from '@material-ui/icons/PermMedia';

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
  fieldIcons: {
    marginTop: theme.spacing(2)
  },
  imgPreview: {
    width: 250,
    maxHeight: 300
  }
}));

const ImagePopoverPreview = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <PermMediaIcon className={classes.fieldIcons}
                     aria-owns={open ? 'mouse-over-popover' : undefined}
                     aria-haspopup="true"
                     onMouseEnter={handlePopoverOpen}
                     onMouseLeave={handlePopoverClose}/>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
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
        <img className={classes.imgPreview} src={props.fileUrl}/>
      </Popover>
    </>

  );
};

export default ImagePopoverPreview;