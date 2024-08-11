import { createConnection } from 'typeorm';
import dbConfig from '../config/db.config';
import { dbConfigType } from '../interface/db.config.interface';
import { rejects } from 'assert';
import { handleDbError } from '../helpers/handleDatabaseError';
export const connectDatabase = async (db_name = null) => {
  try {
    const connection = await createConnection(dbConfig as dbConfigType | any);
    if (!connection) {
      throw new Error(`Could not connect the Database`);
    }
    return new Promise((resolve, reject) => {
      const validate_connection = connection ? 1 : 0;
      if (validate_connection.toString().startsWith('1')) {
        resolve('Databaase is connected Successfully');
      } else {
        reject('Database is not connected Successfully');
      }
    });
  } catch (err: unknown | any) {
    handleDbError(err);
  }
};
