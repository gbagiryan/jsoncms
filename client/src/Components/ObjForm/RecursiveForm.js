import React, { useEffect, useState } from 'react';
import {
  Grid,
  IconButton,
  makeStyles,
  MenuItem,
  Paper,
  Table, TableBody, TableCell,
  TableContainer,
  TableHead, TableRow,
  TextField
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ReactQuill from 'react-quill';
import ProgressWithPercentage from '../../Common/ProgressWithPercentage';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Parser from 'html-react-parser';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ArrayRecursiveForm from './ArrayRecursiveForm';

const useStyles = makeStyles(theme => ({
  paperStyle: {
    padding: 20,
    margin: 'auto',
    width: 600,
    border: '1px solid #3f51b5'
  }
}));

const RecursiveForm = (props) => {
  const classes = useStyles();

  const inputTypes = [
    { value: 'string', label: 'string' },
    { value: 'array', label: 'array' },
    { value: 'object', label: 'object' },
    { value: 'file', label: 'file' },
    { value: 'rich-text', label: 'rich-text' }
  ];

  const [subObjs, setSubObjs] = useState({});
  const [subObjKey, setSubObjKey] = useState('');
  const [subObjValue, setSubObjValue] = useState('');

  const [type, setType] = useState(inputTypes[0].value);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (props.existingObjs) {
      setSubObjs(props.existingObjs.objs);
    }
  }, [props.existingObjs]);

  useEffect(() => {
    props.setParentValue(subObjs);
  }, [subObjs]);

  const getInnerObjs = (subSubObj) => {
    setSubObjValue(subSubObj);
  };

  const handleChangeKey = (e) => {
    props.clearMessages();
    setSubObjKey(e.target.value);
  };
  const handleChangeValue = (e) => {
    props.clearMessages();
    setSubObjValue(e.target.value);
  };
  const handleAddSubObj = () => {
    props.clearMessages();
    if (subObjKey && subObjValue) {
      if (!subObjs.hasOwnProperty(subObjKey)) {
        setSubObjs({ ...subObjs, ...{ [subObjKey]: { subObjValue, type } } });
        setSubObjKey('');
        setSubObjValue('');
      } else {
        props.setErrorMsg('Keys of an object must be unique');
      }
    } else {
      props.setErrorMsg('Key and Value Required');
    }
  };

  const handleUpload = async (e) => {
    setUploadProgress(0);
    const formData = new FormData();
    formData.append('uploadedFile', e.target.files[0]);
    const uploadedFileName = await Axios.post('/api/posts/uploadFile', formData, {
      onUploadProgress: progressEvent => {
        const { loaded, total } = progressEvent;
        setUploadProgress(Math.floor((loaded * 100) / total));
      }
    });
    setSubObjValue({ ...uploadedFileName.data });
  };

  const handleDeleteSubObj = (subObjKey) => {
    const { [subObjKey]: tmp, ...rest } = subObjs;
    setSubObjs(rest);
  };
  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  return (
    <Paper className={classes.paperStyle} elevation={2}>
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Keys</TableCell>
              <TableCell align="right">Values</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(subObjs).map((subObj, i) =>
              <TableRow key={subObj}>
                <TableCell component="th" scope="row">
                  {subObj}
                </TableCell>
                <TableCell align="right">{subObjs[subObj].fileName ?
                  <>
                    {subObjs[subObj].originalName}
                    <IconButton
                      component={Link}
                      to={{ pathname: process.env.REACT_APP_SERVER_BASE_URL + subObjs[subObj].fileName }}
                      target={'_blank'}
                      color="primary">
                      <ExitToAppIcon/>
                    </IconButton>
                  </>
                  : subObjs[subObj].name ? subObjs[subObj].name : Parser(JSON.stringify(subObjs[subObj]))}
                  <IconButton
                    onClick={() => handleDeleteSubObj(subObj)}
                    color="primary">
                    <HighlightOffIcon/>
                  </IconButton>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <TextField fullWidth variant="outlined" placeholder={'Key'} name={'key'} label={'Key'}
                     value={subObjKey} onChange={handleChangeKey}/>
        </Grid>
        <Grid item xs={2}>
          <TextField
            id="standard-select"
            select
            label="Select"
            value={type}
            onChange={handleChangeType}
            helperText="Select type"
          >
            {inputTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={2}>
          <IconButton onClick={handleAddSubObj} color="primary">
            <AddCircleIcon/>
          </IconButton>
        </Grid>
        {type === 'string'
        &&
        <Grid item xs={12}>
          <TextField fullWidth variant="outlined" placeholder={'Value'} name={'value'} label={'Value'}
                     value={subObjValue} onChange={handleChangeValue}/>
        </Grid>
        }
        {type === 'rich-text'
        &&
        <Grid item xs={12}>
          <ReactQuill value={subObjValue} onChange={html => handleChangeValue({ target: { value: html } })}/>
        </Grid>
        }
        {type === 'file'
        &&
        <Grid item xs={12}>
          <div>
            <input type={'file'} name={'upload'} onChange={handleUpload}/>
          </div>
          {(uploadProgress > 0)
          && <ProgressWithPercentage value={uploadProgress}/>
          }
        </Grid>
        }
        {type === 'object'
        &&
        <RecursiveForm setParentValue={getInnerObjs}
                       setErrorMsg={props.setErrorMsg}
                       clearMessages={props.clearMessages}/>
        }
        {type === 'array'
        &&
        <div>
          <ArrayRecursiveForm setParentValue={getInnerObjs}
                              setErrorMsg={props.setErrorMsg}
                              clearMessages={props.clearMessages}/>
        </div>
        }
      </Grid>
    </Paper>
  );
};

export default RecursiveForm;
