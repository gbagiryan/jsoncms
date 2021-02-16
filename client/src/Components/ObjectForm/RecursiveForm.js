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

  const [subObjects, setSubObjects] = useState({});
  const [subObjectKey, setSubObjectKey] = useState('');
  const [subObjectValue, setSubObjectValue] = useState('');

  const [type, setType] = useState(inputTypes[0].value);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    props.setParentValue(subObjects);
  }, [subObjects]);

  const getInnerObjects = (subSubObject) => {
    setSubObjectValue(subSubObject);
  };

  const handleChangeKey = (e) => {
    props.clearMessages();
    setSubObjectKey(e.target.value);
  };
  const handleChangeValue = (e) => {
    props.clearMessages();
    setSubObjectValue(e.target.value);
  };
  const handleAddSubObject = () => {
    props.clearMessages();
    if (subObjectKey && subObjectValue) {
      if (!subObjects.hasOwnProperty(subObjectKey)) {
        setSubObjects({ ...subObjects, ...{ [subObjectKey]: subObjectValue } });
        setSubObjectKey('')
        setSubObjectValue('')
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
    setSubObjectValue(uploadedFileName.data);
  };

  const handleDeleteSubObject = (subObjectKey) => {
    const { [subObjectKey]: tmp, ...rest } = subObjects;
    setSubObjects(rest);
  };
  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  return (
    <Paper className={classes.paperStyle} elevation={8}>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Keys</TableCell>
              <TableCell align="right">Values</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(subObjects).map((subObject, i) =>
              <TableRow key={subObject}>
                <TableCell component="th" scope="row">
                  {subObject}
                </TableCell>
                <TableCell align="right">{subObjects[subObject].fileName ?
                  <>
                    {subObjects[subObject].originalName}
                    <IconButton
                      component={Link}
                      to={{ pathname: process.env.REACT_APP_SERVER_BASE_URL + subObjects[subObject].fileName }}
                      target={'_blank'}
                      color="primary">
                      <ExitToAppIcon/>
                    </IconButton>
                  </>
                  : subObjects[subObject].name ? subObjects[subObject].name : Parser(JSON.stringify(subObjects[subObject]))}
                  <IconButton
                    onClick={() => handleDeleteSubObject(subObject)}
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
                     value={subObjectKey} onChange={handleChangeKey}/>
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
          <IconButton onClick={handleAddSubObject} color="primary">
            <AddCircleIcon/>
          </IconButton>
        </Grid>
        {type === 'string'
        &&
        <Grid item xs={12}>
          <TextField fullWidth variant="outlined" placeholder={'Value'} name={'value'} label={'Value'}
                     value={subObjectValue} onChange={handleChangeValue}/>
        </Grid>
        }
        {type === 'rich-text'
        &&
        <Grid item xs={12}>
          <ReactQuill value={subObjectValue} onChange={html => handleChangeValue({ target: { value: html } })}/>
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
        <div>
          <RecursiveForm setParentValue={getInnerObjects}
                         setErrorMsg={props.setErrorMsg}
                         clearMessages={props.clearMessages}/>
        </div>
        }
        {type === 'array'
        &&
        <div>
          array placeholder
        </div>
        }
      </Grid>
    </Paper>
  );
};

export default RecursiveForm;
