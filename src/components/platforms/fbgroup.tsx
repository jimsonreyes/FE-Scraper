import React from "react";
import { makeStyles } from '@mui/styles';
import {
  Grid,
  TextField
} from "@mui/material";

const useStyles = makeStyles(() => ({
  fieldsDiv: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '50px'
  },
  label: {
    fontFamily: 'roboto-bold',
    marginRight: '20px'
  },
  textField: {
    width: '100%'
  }
}));

const FacebookGroup = (props: any) => {

  const classes = useStyles();
  const {onGroupID, onPostCount} = props;

  const onChangeGroupID = (event: any) => {
    onGroupID(event.target.value);
  };

  const onChangePostCount = (event: any) => {
    onPostCount(Number(event.target.value));
  };

  return (
    <div>
      <Grid container spacing={2} columns={16} className={classes.fieldsDiv}>
        <TextField
          margin="normal"
          name="group_id"
          label="Enter GroupID"
          id="group_id"
          onChange={onChangeGroupID}
          className={classes.textField}
          placeholder={'847457862380168'}
        />
      </Grid>

      <Grid container spacing={2} columns={16} className={classes.fieldsDiv}>
        <TextField
          id="post_count"
          label="Post Count"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          className={classes.textField}
          onChange={onChangePostCount}
        />
      </Grid>
    </div>
  )
};

export default FacebookGroup;