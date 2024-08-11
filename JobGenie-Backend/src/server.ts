import { Application } from 'express';
import express from 'express';
import { connectDatabase } from './database/connect';
import Logger from './lib/logger';
import { initalizeMiddleware } from './middleware/server.middleware';
import { initalizeRoutes } from './routes/server.routes';
import { checkGraphqlConnection } from './config/graphql.config';
class App {
  private expressApplication: Application;
  private serverPort: number | string;
  private database_name: string;

  constructor(serverPort: number | string, database_name: string) {
    this.expressApplication = express();
    this.serverPort = serverPort;
    this.database_name = database_name;
    initalizeMiddleware(this.expressApplication);
    initalizeRoutes(this.expressApplication);
  }

  private async initalizeDatabase(): Promise<any> {
    return connectDatabase(this.database_name as any);
  }

  public async listen(): Promise<any | void> {
    try {
      await this.initalizeDatabase().then(async (data: string) => {
        Logger.info(data);
        const connectMessage = `Server is starting on the http://localhost:${this.serverPort}`;
        const reuslt = await checkGraphqlConnection();
        Logger.info(reuslt);
        this.expressApplication.listen(this.serverPort as number, () => {
          Logger.http(connectMessage);
        });
      });
    } catch (err) {
      console.error(err);
    }
  }
}

export default App;
