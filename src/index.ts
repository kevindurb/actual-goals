import express from 'express';
import { Config } from './Config.ts';
import { GoalController } from './Controller.ts';
import bodyParser from 'body-parser';
import api from '@actual-app/api';
import { Goal } from './Goal.ts';

const config = new Config();
config.loadFromEnv();

await Goal.sync({ alter: true });

await api.init({
  dataDir: '.cache/actual-budget/',
  serverURL: config.actualBudgetServerUrl,
  password: config.actualBudgetPassword,
});

const app = express();
app.use(bodyParser.json());

app.use(GoalController);

app.listen(config.port, () =>
  console.log(`API Listening at http://localhost:${config.port}`),
);
