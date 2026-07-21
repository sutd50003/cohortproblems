import createError = require('http-errors');
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import proc from 'process';
import db from './models/db';

import * as staffModel from './models/staff';
import * as deptModel from './models/dept';
import * as workfModel from './models/work';

staffModel.sync();
deptModel.sync();
workfModel.sync();

proc.on('SIGINT', db.cleanup);
proc.on('SIGTERM', db.cleanup);

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import deptRouter from './routes/dept';
import staffRouter from './routes/staff';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/staff', staffRouter);
app.use('/dept', deptRouter);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
