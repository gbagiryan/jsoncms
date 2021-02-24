import React, { useState } from 'react';
import {
  Button,
  Grid,
  makeStyles, TextField
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Link } from 'react-router-dom';
import RecursiveMain from './RecursiveMain';
import Container from '@material-ui/core/Container';
import { Error, Success } from '../../Common/Messages';
import ConfirmDialog from '../../Common/ConfirmDialog';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  paper: {
    minHeight: 200,
    width: 300,
    padding: theme.spacing(2)
  },
  objPreview: {
    margin: 'auto'
  },
  buttons: {
    margin: theme.spacing(1),
  },
  tags: {
    border: '1px solid '
  }
}));

const Main = (props) => {

  const classes = useStyles();

  return (
    <Container className={classes.root}>
      {props.initialObjs ?
        <Grid container spacing={2}>
          {props.errorMsg &&
          <Grid item xs={12}>
            <Error errorMsg={props.errorMsg}/>
          </Grid>
          }
          {props.successMsg &&
          <Grid item xs={12}>
            <Success successMsg={props.successMsg}/>
          </Grid>
          }

          <Grid container>
            <Grid item xs={8}>
              <TextField variant="outlined"
                         size="small"
                         placeholder={'Name'}
                         name={'name'}
                         label={'Name'}
                         value={props.name}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                onClick={() => {
                  props.setConfirmDialog({
                    isOpen: true,
                    title: `Deleting ${props.name}`,
                    subTitle: `Are you sure you want to completely delete this object`,
                    onConfirm: () => props.handleDeleteObj(props.objId)
                  });
                }}
                variant="contained"
                color="secondary"
                className={classes.buttons}
                endIcon={<DeleteForeverIcon/>}>Delete</Button>
              <Button component={Link} to={`/edit_obj/${props.objId}`}
                      variant="contained"
                      color="primary"
                      className={classes.buttons}
                      endIcon={<EditIcon/>}>Edit</Button>
            </Grid>
          </Grid>
          <RecursiveMain initialObjs={props.initialObjs}/>
          {props.tagsArr.length > 0 &&
          <Grid item xs={7} className={classes.tags}>
            {props.tagsArr.map((tag) =>
              <>
                {tag},
              </>
            )}
          </Grid>
          }
          <ConfirmDialog confirmDialog={props.confirmDialog} setConfirmDialog={props.setConfirmDialog}/>
        </Grid>
        : <h2>
          Choose an object to display
        </h2>
      }
    </Container>
  );
};

export default Main;
