import {
  makeStyles,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import parse from 'html-react-parser';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import RichTextDialog from '../RichTextDialog/RichTextDialog';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      marginTop: theme.spacing(3)
    }
  },
  rtfEditor: {
    width: 400,
    '& .ql-container': {
      overflow: 'hidden'
      // minHeight: 100
    },
    '& .ql-toolbar.ql-snow': {
      display: 'none'
    },
    '& .ql-editor': {
      height: 100,
      overflow: 'hidden'
    }
  },
  fields: {
    border: '1px solid rgba(0, 0, 0, 0.3)',
    display: 'block',
    borderRadius: 5,
    padding: 8,
    marginTop: theme.spacing(3),
    position: 'relative',
    width: 'fit-content',
    blockSize: 'fit-content',
    minWidth: '200px',
    minHeight: '25px',
    marginRight: theme.spacing(1)
  },
  label: {
    fontSize: '0.9rem',
    color: '#3f51b5',
    position: 'absolute',
    top: -20,
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
        <>
          <Grid container xs={12}>
            {!props.isArray &&
            <Grid>
              <Typography className={classes.fields}>
                <label className={classes.label}>Key</label>
                {objs[index].__key}
              </Typography>
            </Grid>
            }
            {objs[index].__type === 'string' &&
            <Grid>
              <Typography className={classes.fields}>
                <label className={classes.label}>Value</label>
                {objs[index].__value}
              </Typography>
            </Grid>
            }
            {objs[index].__type === 'file' &&
            <Grid>
              <IconButton
                component={Link}
                to={{ pathname: process.env.REACT_APP_SERVER_BASE_URL + objs[index].__value.fileName }}
                target={'_blank'}
                color="primary">
                <ExitToAppIcon/>
              </IconButton>
            </Grid>
            }
            <Grid>
              <Typography className={classes.fields}>
                <label className={classes.label}>Type</label>
                {objs[index].__type}
              </Typography>
            </Grid>
          </Grid>
          <div className={classes.innerObj}>
            {objs[index].__type === 'object' &&
            <RecursiveMain initialObjs={objs[index].__value}/>}
            {objs[index].__type === 'array' &&
            <RecursiveMain initialObjs={objs[index].__value} isArray={true}/>}
            {objs[index].__type === 'rich-text' &&
            <div className={classes.innerObj}>
              <RichTextDialog readOnly={true} value={objs[index].__value}
                              handleChildInput={props.handleChildInput}
                              index={props.index ? `${props.index}.${index}` : `${index}`}/>
              <ReactQuill className={classes.rtfEditor} readOnly={true} value={objs[index].__value}/>
            </div>
            }
          </div>
        </>
      )}
    </div>
  );
};

export default RecursiveMain;
