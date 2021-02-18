import React from 'react';
import { IconButton, TableCell } from '@material-ui/core';
import Parser from 'html-react-parser';
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Paper from '@material-ui/core/Paper';

const MainRecursive = (props) => {
  return (
    <TableCell align="right">{props.obj.type === 'file' ?
      <div>
        {props.obj.originalName}
        <IconButton
          component={Link}
          to={{ pathname: process.env.REACT_APP_SERVER_BASE_URL + props.obj.fileName }}
          target={'_blank'}
          color="primary">
          <ExitToAppIcon/>
        </IconButton>
      </div>
      : props.obj.type === 'rich-text' ?
        Parser(JSON.stringify(props.obj))
        : props.obj.type === 'object' ?
          <Paper>
            <MainRecursive obj={props.obj.subObjValue}/>
          </Paper>
          : props.obj}
    </TableCell>
  );
};

export default MainRecursive;