import { Router } from 'express';
import { object, string } from 'yup';
import { GoalRepository } from './GoalRepository.js';
import { GoalModel } from './GoalModel.js';

const createGoalBody = object({
  name: string().required(),
}).strict();

const updateGoalBody = object({
  name: string().optional(),
}).strict();

const goalRepository = new GoalRepository();

export const controller = Router();

controller.get('/goals', (_, res) => {
  res.status(200).send(goalRepository.getAll().map((g) => g.json()));
});

controller.post('/goals', async (req, res) => {
  const body = await createGoalBody.validate(req.body);
  const goal = new GoalModel();
  goal.name = body.name;
  goalRepository.save(goal);

  res.status(201).send(goal.json());
});

controller.put('/goals/:id', async (req, res) => {
  const body = await updateGoalBody.validate(req.body);
  const goal = goalRepository.get(Number.parseInt(req.params.id));
  goal.name = body.name;
  goalRepository.save(goal);

  res.status(200).send(goal.json());
});

controller.delete('/goals/:id', async (req, res) => {
  goalRepository.delete(Number.parseInt(req.params.id));
  res.status(200).end();
});
