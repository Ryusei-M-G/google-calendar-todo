import express from 'express'

import google_oauth from './google_oauth';
import callback from './callback';
const app = express();

const port = 3000;

app.get('/auth',google_oauth);
app.get('/callback',callback);
app.listen(port, ()=>{
  console.log('server is running')
})