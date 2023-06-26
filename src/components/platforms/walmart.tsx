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

const Walmart = (props: any) => {

  const classes = useStyles();
  const {onKeyword, onLimit} = props;

  const onChangeKeyword = (event: any) => {
    onKeyword(event.target.value);
  };

  const onChangeLimit = (event: any) => {
    onLimit(Number(event.target.value));
  };

  return (
    <div>
      <Grid container spacing={2} columns={16} className={classes.fieldsDiv}>
        <TextField
          margin="normal"
          name="keyword"
          label="Enter Keyword"
          id="keyword"
          onChange={onChangeKeyword}
          className={classes.textField}
          placeholder={'Bluetooth Speaker'}
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

export default Walmart;