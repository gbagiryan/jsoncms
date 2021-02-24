import {
  IconButton,
  makeStyles,
  MenuItem,
  TextField
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import ReactQuill from 'react-quill';
import Axios from 'axios';
import ProgressWithPercentage from '../../Common/ProgressWithPercentage';
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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

const RecursiveMain = (props) => {

  const classes = useStyles();

  const inputTypes = [
    { value: 'string', label: 'string' },
    { value: 'array', label: 'array' },
    { value: 'object', label: 'object' },
    { value: 'file', label: 'file' },
    { value: 'rich-text', label: 'rich-text' }
  ];

  const [objs, setObjs] = useState([{ __key: '', __value: '', __type: inputTypes[0].value }]);

  useEffect(() => {
    if (props.initialObjs) {
      handleAddInitialFields(props.initialObjs);
    }
  }, [props.initialObjs]);

  const handleAddInitialFields = (initialObjs) => {
    setObjs(Object.values(initialObjs));
  };

  return (
    <div className={classes.root}>
      {objs.map((fieldKey, index) =>
        <div>
          <TextField
            placeholder={'Key'}
            name={'__key'}
            value={objs[index].__key}
            variant="outlined"
            size="small"
            label={'Key'}
          />
          {objs[index].__type === 'string' &&
          <TextField
            placeholder={'Value'}
            name={'__value'}
            value={objs[index].__value}
            variant="outlined"
            size="small"
            label={'Value'}
          />
          }
          {objs[index].__type === 'file' &&
          <>
            <IconButton
              component={Link}
              to={{ pathname: process.env.REACT_APP_SERVER_BASE_URL + objs[index].__value.fileName }}
              target={'_blank'}
              color="primary">
              <ExitToAppIcon/>
            </IconButton>
          </>
          }
          <TextField
            id="standard-select"
            select
            name={'__type'}
            value={objs[index].__type}
          >
            <MenuItem value={objs[index].__type}>
              {objs[index].__type}
            </MenuItem>
          </TextField>
          <div className={classes.innerObj}>
            {objs[index].__type === 'object' &&
            <RecursiveMain initialObjs={objs[index].__value}/>}
            {objs[index].__type === 'rich-text' &&
            <ReactQuill className={classes.rtfEditor} value={objs[index].__value}/>}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecursiveMain;
