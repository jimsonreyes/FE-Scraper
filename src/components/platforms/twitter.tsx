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

const Twitter = (props: any) => {

  const classes = useStyles();
  const {onAccount, onLimit} = props;

  const onChangeAccount = (event: any) => {
    onAccount(event.target.value);
  };

  // const onChangeHashtag = (event: any) => {
  //   console.log('$$$$$$$$$$$$', event.target.value)
  // };

  const onChangeLimit = (event: any) => {
    onLimit(Number(event.target.value));
  };

  return (
    <div>
      <Grid container spacing={2} columns={16} className={classes.fieldsDiv}>
        <TextField
          margin="normal"
          name="account"
          label="Enter Account"
          id="account"
          onChange={onChangeAccount}
          className={classes.textField}
          placeholder={'ManningBooks'}
        />
      </Grid>

      {/*<Grid container spacing={2} columns={16} className={classes.fieldsDiv}>*/}
      {/*  <TextField*/}
      {/*    margin="normal"*/}
      {/*    name="hashtag"*/}
      {/*    label="Enter Hashtag"*/}
      {/*    id="hashtag"*/}
      {/*    onChange={onChangeHashtag}*/}
      {/*    className={classes.textField}*/}
      {/*  />*/}
      {/*</Grid>*/}

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

export default Twitter;