import express from 'express';
import { Config } from './Config.js';
import { controller as goalController } from './goalController.js';
import bodyParser from 'body-parser';
import api from '@actual-app/api';
import { GoalRepository } from './GoalRepository.js';

const config = new Config();
config.loadFromEnv();
await api.init({
  dataDir: '.cache/actual-budget/',
  serverURL: config.actualBudgetServerUrl,
  password: config.actualBudgetPassword,
});

const app = express();
app.use(bodyParser.json());

app.locals = {
  config,
  goalRepository: new GoalRepository(),
};

app.use(goalController);

app.listen(config.port, () =>
  console.log(`API Listening at http://localhost:${config.port}`),
);
