import createError from 'http-errors';
import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { cleanup } from './models/db';

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import deptRouter from './routes/dept';
import staffRouter from './routes/staff';

const app: Application = express();

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/staff', staffRouter);
app.use('/dept', deptRouter);

app.use(function(_req: Request, _res: Response, next: NextFunction) {
  next(createError(404));
});

app.use(function(err: createError.HttpError, _req: Request, res: Response, _next: NextFunction) {
  res.locals.message = err.message;
  res.locals.error = app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

export default app;