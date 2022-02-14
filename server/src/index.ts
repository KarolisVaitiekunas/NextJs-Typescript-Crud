import express from 'express';
import config from 'config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import log from './utils/logger';

import connectToDB from './utils/database';

const clientHost = config.get<string>('clientHost');
const serverPort = config.get<number>('serverPort');

const serverHost = config.get<string>('serverHost');
const clientPort = config.get<number>('clientPort');

declare module 'express-serve-static-core' {
  interface Request {
    user: string;
  }
  interface Response {
    user: string;
  }
}

const app = express();
app.use(cors({ credentials: true, origin: `http://${clientHost}:${clientPort}` }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

import authRouter from './routes/authRoute';
app.use('/auth', authRouter);

import postRouter from './routes/postRoute';
app.use('/post', postRouter);

app.listen(serverPort, () => {
  log.info(`Server listening at http://${serverHost}:${serverPort}`);
  connectToDB();
});
