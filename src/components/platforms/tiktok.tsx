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

const TikTok = (props: any) => {

  const classes = useStyles();
  const { onUsername, onLimit } = props;

  const onChangeUsername = (event: any) => {
    onUsername(event.target.value);
  };

  const onChangeLimit = (event: any) => {
    onLimit(Number(event.target.value));
  };

  return (
    <div>
      <Grid container spacing={2} columns={16} className={classes.fieldsDiv}>
        <TextField
          margin="normal"
          name="username"
          label="Enter Username"
          id="username"
          onChange={onChangeUsername}
          className={classes.textField}
          placeholder={'cristianoreaction'}
        />
      </Grid>

      <Grid container spacing={2} columns={16} className={classes.fieldsDiv}>
        <TextField
          id="count"
          label="Limit Count"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          className={classes.textField}
          onChange={onChangeLimit}
        />
      </Grid>
    </div>
  )
};

export default TikTok;