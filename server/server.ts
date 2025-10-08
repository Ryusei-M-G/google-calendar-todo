import express from 'express'
import { configDotenv } from 'dotenv';
import google_oauth from './google_oauth';
import callback from './callback';

configDotenv();

const app = express();
const port = process.env.PORT;

app.get('/auth',google_oauth);
app.get('/auth/google/callback',callback);
app.listen(port, ()=>{
  console.log(`server is running port:${port}`)
})