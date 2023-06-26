import React, {useCallback, useState} from "react";
import { makeStyles } from '@mui/styles';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography
} from "@mui/material";
import Instagram from "./platforms/instagram";
import Reddit from "./platforms/reddit";
import TikTok from "./platforms/tiktok";
import Walmart from "./platforms/walmart";
import Amazon from "./platforms/amazon";
import FacebookGroup from "./platforms/fbgroup";
import Twitter from "./platforms/twitter";
import {apiClient} from "../config/apiClient";
import LoadingButton from '@mui/lab/LoadingButton';

const useStyles = makeStyles(() => ({
  body: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#282c34',
    position: 'relative',
  },
  title: {
    fontFamily: 'Spartan-bold',
    paddingTop: '50px!important',
    fontSize: '80px!important'
  },
  label: {
    fontFamily: 'roboto-bold',
    marginRight: '20px'
  },
  select: {
    width: '100%'
  },
  pickSocialDiv: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '100px',
    width: '400px'
  },
  runBtn: {
    position: 'absolute',
    bottom: '50px'
  },
  errMsgDiv: {
    position: 'absolute',
    bottom: '90px',
    fontFamily: 'roboto-regular',
    color:'#ED564A'
  },
  platformDiv: {
    paddingTop: '100px',
    width: '400px'
  }
}));

const MainComponent = () => {

  const classes = useStyles();
  const [platform, setPlatform] = useState('TikTok');
  const [keyword, setKeyword] = useState('');
  const [count, setCount] = useState(0);
  const [errMsg, setErrMsg] = useState('');
  const [resMsg, setResMsg] = useState('');
  const [dir, setDir] = useState('');
  const [loading, setLoading] = useState(false);

  const platforms = [
    'TikTok',
    'Reddit',
    'Twitter',
    'Instagram',
    'Walmart',
    'Amazon',
    'Facebook Group'
  ];

  const handleChange = (event: SelectChangeEvent) => {
    initVars();
    setPlatform(event.target.value as string);
  };

  const initVars = () => {
    setErrMsg('');
    setResMsg('');
    setKeyword('');
    setCount(0);
  };

  const onChangeKeyword = (keyword: string) => {
    setKeyword(keyword);
  };

  const onChangeLimit = (count: number) => {
    setCount(count);
  };

  const onScrape = useCallback(async () => {
    setLoading(true);
    try {
      let res = null;
      switch (platform) {
        case 'Twitter':
          res = await apiClient().get('/api/scrape-twitter', {params: {account: keyword, count: count}});
          setDir('twitter');
          break;
        case 'Instagram':
          res = await apiClient().get('/api/scrape-instagram', {params: {username: keyword, count: count}});
          setDir('instagram');
          break;
        case 'Reddit':
          res = await apiClient().get('/api/scrape-reddit', {params: {url: keyword, count: count}});
          setDir('reddit');
          break;
        case 'TikTok':
          res = await apiClient().get('/api/scrape-tiktok', {params: {username: keyword, count: count}});
          setDir('tiktok');
          break;
        case 'Walmart':
          res = await apiClient().get('/api/scrape-walmart', {params: {keyword: keyword, count: count}});
          setDir('walmart');
          break;
        case 'Amazon':
          res = await apiClient().get('/api/scrape-amazon', {params: {keyword: keyword, count: count}});
          setDir('amazon');
          break;
        case 'Facebook Group':
          res = await apiClient().get('/api/scrape-fbgroup', {params: {group_id: keyword, count: count}});
          setDir('fb_group');
          break;
        default:
          res = await apiClient().get('/api/scrape-tiktok', {params: {account: keyword, count: count}});
          setDir('tiktok');
          break;
      }
      setErrMsg('');
      setLoading(false);
      setResMsg(res.data.message);
    } catch (error: any) {
      setResMsg('');
      setLoading(false);
      const message = error.response.message;
      setErrMsg(message);
    }

  }, [platform, keyword, count]);

  return (
    <div className={classes.body}>
      <Typography variant="h2" component="h2" className={classes.title}>
        Internal Scraping Tool
      </Typography>

      <div className={classes.pickSocialDiv}>
        <Grid container spacing={2} columns={16} style={{ display: 'flex', alignItems: 'center' }}>
          <FormControl className={classes.select}>
            <InputLabel id="demo-simple-select-label">Platform</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={platform}
              label="Platform"
              onChange={handleChange}
            >
              {platforms.map((item: string) => (
                <MenuItem key={item} value={item}>{ item }</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </div>

      <div className={classes.platformDiv}>
        {platform === 'Twitter' && <Twitter onAccount={onChangeKeyword} onLimit={onChangeLimit} />}
        {platform === 'Instagram' && <Instagram onUsername={onChangeKeyword} onLimit={onChangeLimit} />}
        {platform === 'Reddit' && <Reddit onURL={onChangeKeyword} onPostCount={onChangeLimit} />}
        {platform === 'TikTok' && <TikTok onUsername={onChangeKeyword} onLimit={onChangeLimit} />}
        {platform === 'Walmart' && <Walmart onKeyword={onChangeKeyword} onLimit={onChangeLimit} />}
        {platform === 'Amazon' && <Amazon onKeyword={onChangeKeyword} onLimit={onChangeLimit} />}
        {platform === 'Facebook Group' && <FacebookGroup onGroupID={onChangeKeyword} onPostCount={onChangeLimit} />}
      </div>

      {resMsg && (
        <div className={classes.errMsgDiv} style={{ color: '#2e7d32' }}>
          <span>{ resMsg }</span> <br/>
          <span>The CSV will be uploaded to staging.data-collection-380621.appspot.com/{dir} of Cloud Storage</span>
        </div>
      )}

      {errMsg && (
        <div className={classes.errMsgDiv}>
          <span>{ errMsg }</span>
        </div>
      )}

      <div className={classes.runBtn}>
        <LoadingButton
          size="small"
          onClick={() => onScrape()}
          loading={loading}
          variant="contained"
          disabled={!keyword || count <= 0 || loading}
        >
          Start Scraping
        </LoadingButton>
      </div>
    </div>
  )
};

export default MainComponent;