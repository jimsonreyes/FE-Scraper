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

const Reddit = (props: any) => {

  const classes = useStyles();
  const {onURL, onPostCount} = props;

  const onChangeURL = (event: any) => {
    onURL(event.target.value);
  };

  const onChangePostCount = (event: any) => {
    onPostCount(Number(event.target.value));
  };

  return (
    <div>
      <Grid container spacing={2} columns={16} className={classes.fieldsDiv}>
        <TextField
          margin="normal"
          name="subreddit_url"
          label="Subreddit URL"
          id="subreddit_url"
          onChange={onChangeURL}
          className={classes.textField}
          placeholder={'https://www.reddit.com/r/pelotoncycle/search?q=flair%3A%22feature%20request%22&restrict_sr=on&include_over_18=on&sort=new&t=all'}
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

export default Reddit;