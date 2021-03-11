import React from 'react';
import {
  Button,
  Grid,
  makeStyles
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Link } from 'react-router-dom';
import RecursiveMain from './RecursiveMain';
import Container from '@material-ui/core/Container';
import { Error, Success } from '../../Common/Messages';
import ConfirmDialog from '../../Common/ConfirmDialog';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0)
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
    marginTop: theme.spacing(0),
  },
  tags: {
    border: '1px solid rgba(0, 0, 0, 0.3)',
    display: 'block',
    borderRadius: 5,
    padding: 10.5,
    marginTop: theme.spacing(4),
    position: 'relative',
    width: 'fit-content',
    blockSize: 'fit-content',
    minWidth: '25%'
  },
  fields: {
    border: '1px solid rgba(0, 0, 0, 0.3)',
    display: 'block',
    borderRadius: 5,
    padding: 10.5,
    marginTop: theme.spacing(0),
    position: 'relative',
    width: 'fit-content',
    blockSize: 'fit-content',
    minWidth: '25%'
  },
  nameFields: {
    border: '1px solid rgba(0, 0, 0, 0.3)',
    display: 'block',
    borderRadius: 5,
    padding: 10.5,
    marginTop: theme.spacing(0),
    position: 'relative',
    width: 'fit-content',
    blockSize: 'fit-content',
    minWidth: '25%',
    fontWeight: 'bold',
  },
  label: {
    fontSize: '1rem',
    color: '#3f51b5',
    position: 'absolute',
    top: -20,
  },
  nameLabel: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#3f51b5',
    position: 'absolute',
    top: -20,
  },
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
              <Typography className={classes.nameFields}>
                <label className={classes.nameLabel}>Name</label>
                {props.name}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Button className={classes.buttons}
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
                      endIcon={<DeleteForeverIcon/>}>Delete</Button>
              <Button className={classes.buttons}
                      component={Link} to={`/edit_obj/${props.objId}`}
                      variant="contained"
                      color="primary"
                      endIcon={<EditIcon/>}>Edit</Button>
            </Grid>

            <RecursiveMain initialObjs={props.initialObjs}/>

            {props.tagsArr.length > 0 &&
            <Grid item xs={7}>
              <Typography className={classes.tags}>
                <label className={classes.label}>Tags</label>
                {props.tagsArr.map((tag) =>
                  <>
                    {tag},
                  </>
                )}
              </Typography>
            </Grid>
            }
            <ConfirmDialog confirmDialog={props.confirmDialog} setConfirmDialog={props.setConfirmDialog}/>
          </Grid>
        </Grid>
        : <h2>
          Choose an object to display
        </h2>
      }
    </Container>
  );
};

export default Main;
