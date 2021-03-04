import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
}));

const ProgressWithPercentage = (props) => {

  const classes = useStyles();

  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {props.value < 100 ?
          <Typography variant="caption" component="div">{props.value}</Typography>
          : <IconButton
            component={Link}
            to={{ pathname: process.env.REACT_APP_SERVER_BASE_URL + props.file.fileName }}
            target={'_blank'}
            color="primary">
            <ExitToAppIcon/>
          </IconButton>}
      </Box>
    </Box>
  );
};

export default ProgressWithPercentage;
