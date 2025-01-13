import { Router } from 'express';
import { z } from 'zod';
import { Goal } from './Goal.ts';

const CreateGoalBody = z.object({
  name: z.string(),
});

const UpdateGoalBody = z.object({
  name: z.string(),
});

export const controller = Router();

controller.get('/goals', async (_, res) => {
  const goals = await Goal.findAll();
  res.status(200).send(goals.map((goal) => goal.toJSON()));
});

controller.post('/goals', async (req, res) => {
  const body = CreateGoalBody.parse(req.body);
  const goal = await Goal.create(body);
  res.status(201).send(goal.toJSON());
});

controller.put('/goals/:id', async (req, res) => {
  const body = UpdateGoalBody.parse(req.body);
  const goal = await Goal.findByPk(Number.parseInt(req.params.id));
  if (!goal) {
    res.status(404).end();
  } else {
    goal.set(body);
    await goal.save();
    res.status(200).send(goal.toJSON());
  }
});

controller.delete('/goals/:id', async (req, res) => {
  const goal = await Goal.findByPk(Number.parseInt(req.params.id));
  if (!goal) {
    res.status(404).end();
  } else {
    await goal.destroy();
    res.status(200).end();
  }
});
