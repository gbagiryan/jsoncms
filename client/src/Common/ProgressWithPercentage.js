import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const ProgressWithPercentage = (props) => {
  return (
    <Box position="relative" display="inline-flex" style={{ marginTop: 10 }}>
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
        <Typography variant="caption" component="div"
                    color="textSecondary">{props.value < 100 ? `${props.value}%` : 'Done'}</Typography>
      </Box>
    </Box>
  );
};

export default ProgressWithPercentage;