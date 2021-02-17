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
import RecursiveForm from './RecursiveForm';

const useStyles = makeStyles(theme => ({
  paperStyle: {
    padding: 20,
    margin: 'auto',
    width: 600,
    border: '1px solid #3f51b5'
  }
}));

const ArrayRecursiveForm = (props) => {
  const classes = useStyles();

  const inputTypes = [
    { value: 'string', label: 'string' },
    { value: 'array', label: 'array' },
    { value: 'object', label: 'object' },
    { value: 'file', label: 'file' },
    { value: 'rich-text', label: 'rich-text' }
  ];

  const [subObjs, setSubObjs] = useState([]);
  const [subObjValue, setSubObjValue] = useState('');

  const [type, setType] = useState(inputTypes[0].value);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    props.setParentValue(subObjs);
  }, [subObjs]);

  const getInnerObjs = (subSubObj) => {
    setSubObjValue(subSubObj);
  };

  const handleChangeValue = (e) => {
    props.clearMessages();
    setSubObjValue(e.target.value);
  };
  const handleAddSubObject = () => {
    props.clearMessages();
    if (subObjValue) {
      setSubObjs([...subObjs, subObjValue]);
      setSubObjValue('');
    } else {
      props.setErrorMsg('Value Required');
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
    setSubObjValue({ ...uploadedFileName.data, 'type': 'file' });
  };

  const handleDeleteSubObject = (index) => {
    setSubObjs([...subObjs.filter((el) => subObjs.indexOf(el) !== index)]);
  };
  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  return (
    <Paper className={classes.paperStyle} elevation={2}>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="right">Values</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subObjs.map((item, i) =>
              <TableRow key={item._id}>
                <TableCell align="right">{item.fileName ?
                  <>
                    {item.originalName}
                    <IconButton
                      component={Link}
                      to={{ pathname: process.env.REACT_APP_SERVER_BASE_URL + subObjs.fileName }}
                      target={'_blank'}
                      color="primary">
                      <ExitToAppIcon/>
                    </IconButton>
                  </>
                  : item.name ? item.name : Parser(JSON.stringify(item))}
                  <IconButton
                    onClick={() => handleDeleteSubObject(subObjs.indexOf(item))}
                    color="primary">
                    <HighlightOffIcon/>
                  </IconButton>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
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
        <IconButton onClick={handleAddSubObject} color="primary">
          <AddCircleIcon/>
        </IconButton>
      </Grid>
      <Grid container spacing={2}>
        {type === 'string'
        &&
        <Grid item xs={8}>
          <TextField fullWidth variant="outlined" placeholder={'Value'} name={'value'} label={'Value'}
                     value={subObjValue} onChange={handleChangeValue}/>
        </Grid>
        }
        {type === 'rich-text'
        &&
        <Grid item xs={8}>
          <ReactQuill value={subObjValue} onChange={html => handleChangeValue({ target: { value: html } })}/>
        </Grid>
        }
        {type === 'file'
        &&
        <Grid item xs={8}>
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

export default ArrayRecursiveForm;
