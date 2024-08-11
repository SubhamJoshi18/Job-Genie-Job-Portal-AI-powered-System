import { Application } from 'express';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

export const initalizeMiddleware = (expressApplication: Application) => {
  expressApplication.use(express.json());
  expressApplication.use(express.urlencoded({ extended: true }));
  expressApplication.use(cors());
  expressApplication.use(morgan('dev'));
};
