import dotenv from 'dotenv';

import App from './server';

dotenv.config({ path: './.env' });

const serverPort: any = process.env.PORT;
const database_name: any = process.env.DATABASE_NAME;

const app = new App(serverPort, database_name);
app.listen();
