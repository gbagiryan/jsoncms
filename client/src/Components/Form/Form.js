import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getSingleObjData } from '../../Redux/Selectors/ObjSelectors';
import { IconButton, makeStyles, MenuItem, TextField } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import ReactQuill from 'react-quill';

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

const Form = (initialObjs) => {
  const classes = useStyles();

  const inputTypes = [
    { value: 'string', label: 'string' },
    { value: 'array', label: 'array' },
    { value: 'object', label: 'object' },
    { value: 'file', label: 'file' },
    { value: 'rich-text', label: 'rich-text' }
  ];

  const stateObj = useSelector(getSingleObjData);

  useEffect(() => {
    if (stateObj) {
      setPreviewObj(stateObj);
    }
  }, [stateObj]);

  const [previewObj, setPreviewObj] = useState(initialObjs ? initialObjs : {});

  return (
    <div>
      {previewObj &&
      <div className={classes.root}>
        {Object.keys(previewObj.objs).map((fieldKey, index) =>
          <div>
            <TextField
              placeholder={'Key'}
              name={'__key'}
              value={previewObj.objs[fieldKey].__key}
              variant="outlined"
              size="small"
              label={'Key'}
              // onChange={(event) => handleChangeInput(event, fieldKey)}
            />
            {previewObj.objs[fieldKey].__type === 'string' &&
            <TextField
              placeholder={'Value'}
              name={'__value'}
              value={previewObj.objs[fieldKey].__value}
              variant="outlined"
              size="small"
              label={'Value'}
              // onChange={(event) => handleChangeInput(event, fieldKey)}
            />
            }
            {previewObj.objs[fieldKey].__type === 'file' &&
            <>
              {/*<input type={'file'} name={'upload'} onChange={(event) => handleUpload(event, index)}/>*/}
              {/*{(uploadProgress[index] > 0)*/}
              {/*&& <ProgressWithPercentage value={uploadProgress[index]} index={index} file={field.__value}/>*/}
              {/*}*/}
            </>
            }
            <TextField
              id="standard-select"
              select
              name={'__type'}
              value={previewObj.objs[fieldKey].__type}

            >{inputTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
            </TextField>
            <IconButton color="primary" className={classes.fieldIcons}>
              <AddCircleIcon/>
            </IconButton>
            {previewObj.objs.length > 1 &&
            <IconButton color="secondary" className={classes.fieldIcons}>
              <RemoveCircleIcon/>
            </IconButton>
            }
            <div className={classes.innerObj}>
              {stateObj.objs[fieldKey].__type === 'object' &&
              <Form initialObjs={previewObj.objs[fieldKey].__value}/>
              }
              {previewObj.objs[fieldKey].__type === 'rich-text' &&
              <ReactQuill className={classes.rtfEditor} value={previewObj.objs[fieldKey].__value}
              />}
            </div>
          </div>
        )}
      </div>
      }
    </div>

  );
};

export default Form;