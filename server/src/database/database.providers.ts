import { Sequelize } from 'sequelize-typescript';
import { Desks } from './models/desks.entity';
import { Tasks } from './models/tasks.entity';
import { Lists } from './models/lists.entity';
import { ActivityLogs } from './models/activityLogs.entity';
import * as dotenv from 'dotenv';
dotenv.config({ path: `../.env` });

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
      sequelize.addModels([Desks, Tasks, Lists, ActivityLogs]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
