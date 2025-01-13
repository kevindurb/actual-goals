import express from 'express';
import { Config } from './Config.ts';
import { GoalController } from './GoalController.ts';
import bodyParser from 'body-parser';
import api from '@actual-app/api';
import { GoalModel } from './GoalModel.ts';

const config = new Config();
config.loadFromEnv();

await GoalModel.sync({ alter: true });

await api.init({
  dataDir: '.cache/actual-budget/',
  serverURL: config.actualBudgetServerUrl,
  password: config.actualBudgetPassword,
});

const app = express();
app.use(bodyParser.json());

app.use('/api/goals', GoalController);

app.listen(config.port, () =>
  console.log(`API Listening at http://localhost:${config.port}`),
);
