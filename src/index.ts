import express from 'express';
import { Config } from './Config.ts';
import { controller as goalController } from './goalController.ts';
import bodyParser from 'body-parser';
import api from '@actual-app/api';

const config = new Config();
config.loadFromEnv();
await api.init({
  dataDir: '.cache/actual-budget/',
  serverURL: config.actualBudgetServerUrl,
  password: config.actualBudgetPassword,
});

const app = express();
app.use(bodyParser.json());

app.use(goalController);

app.listen(config.port, () =>
  console.log(`API Listening at http://localhost:${config.port}`),
);
