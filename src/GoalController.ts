import { Router } from 'express';
import { z } from 'zod';
import { Goal } from './Goal.ts';

const CreateGoalBody = z.object({
  name: z.string(),
});

const UpdateGoalBody = z.object({
  name: z.string(),
});

const router = Router();

router.get('/goals', async (_, res) => {
  const goals = await Goal.findAll();
  res.status(200).send(goals.map((goal) => goal.toJSON()));
});

router.post('/goals', async (req, res) => {
  const body = CreateGoalBody.parse(req.body);
  const goal = await Goal.create(body);
  res.status(201).send(goal.toJSON());
});

router.get('/goals/:id', async (req, res) => {
  const goal = await Goal.findByPk(Number.parseInt(req.params.id));
  if (!goal) {
    res.status(404).end();
  } else {
    res.status(200).send(goal.toJSON());
  }
});

router.put('/goals/:id', async (req, res) => {
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

router.delete('/goals/:id', async (req, res) => {
  const goal = await Goal.findByPk(Number.parseInt(req.params.id));
  if (!goal) {
    res.status(404).end();
  } else {
    await goal.destroy();
    res.status(200).end();
  }
});

export { router as GoalController };
