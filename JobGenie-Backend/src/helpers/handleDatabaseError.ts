import { TypeORMError } from 'typeorm';
import express from 'express';

export const handleDbError = (err: TypeORMError | Error) => {
  console.error('This is a database error:', err);
};
