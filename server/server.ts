import express from 'express'
import { configDotenv } from 'dotenv';
import google_oauth from './google_oauth';
import callback from './callback';
import { Request,Response } from 'express';
import cors from'cors'


configDotenv();

const app = express();
const port = parseInt(process.env.PORT || '3000');

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost',
  credentials: true
}))

app.get('/auth',google_oauth);
app.get('/auth/google/callback',callback);
app.get('/api/test', (req:Request,res:Response) => {
  console.log('test')
  res.json({message:'test'})

})
app.listen(port, '0.0.0.0', ()=>{
  console.log(`server is running on port:${port}`)
})