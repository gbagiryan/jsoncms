import React, { useEffect, useState } from 'react';
import { IconButton, makeStyles, MenuItem, TextField } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import ReactQuill from 'react-quill';
import ProgressWithPercentage from '../../Common/ProgressWithPercentage';
import 'react-quill/dist/quill.snow.css';
import Axios from 'axios';
import ConfirmDialog from '../../Common/ConfirmDialog';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      marginTop: theme.spacing(3)
    }
  },
  rtfEditor: {
    margin: theme.spacing(1),
    width: 400,
    '& .ql-container': {
      // minHeight: 100
    }
  },
  fieldIcons: {
    marginTop: theme.spacing(2)
  },
  innerObj: {
    marginLeft: theme.spacing(10)
  }
}));

const Recursive = (props) => {

  const classes = useStyles();

  useEffect(() => {
    if (Array.isArray(props.obj)) {
      if (props.obj[0].__type === 'object') {
        props.addInner(props.index);
      }
    } else {
      if (props.obj.__type === 'object') {
        props.addInner(props.index);
      }
    }
  }, [props.obj]);

  return (
    <div>
      {props.obj &&
      <div className={classes.root}>
        <TextField
          placeholder={'Key'}
          name={'__key'}
          value={props.obj.__key}
          variant="outlined"
          size="small"
          label={'Key'}
          onChange={(event) => props.handleChangeInput(event, props.index)}
        />
        {props.obj.__type === 'string' &&
        <TextField
          placeholder={'Value'}
          name={'__value'}
          value={props.obj.__value}
          variant="outlined"
          size="small"
          label={'Value'}
          onChange={(event) => props.handleChangeInput(event, props.index)}
        />
        }
        <TextField
          id="standard-select"
          select
          name={'__type'}
          value={props.obj.__type}
          onChange={(event) => props.handleChangeType(event, props.index)}
        >{props.inputTypes.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
        </TextField>

        <div className={classes.innerObj}>
          {props.obj.__type === 'object' &&
          <Recursive
            inputTypes={props.inputTypes}
            obj={Array.isArray(props.obj) ? props.obj.__value[0] : props.obj.__value}
            handleChangeInput={(event) => props.handleChangeInput(event, props.index)}
            handleChangeType={(event) => props.handleChangeType(event, props.index)}
            index={props.index}
            addInner={() => props.addInner(props.index)}
          />
          }
        </div>
      </div>
      }
    </div>
  );
};

export default Recursive;
