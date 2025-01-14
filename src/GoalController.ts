import { Router } from 'express';
import { z } from 'zod';
import { GoalModel } from './GoalModel.ts';

export const CreateGoalBody = z
  .object({
    name: z.string(),
    type: z.enum(['MONTHLY', 'ONE_TIME']),
  })
  .strict();

export const UpdateGoalBody = CreateGoalBody.partial();

const router = Router();

router.get('/', async (_, res) => {
  const goals = await GoalModel.findAll();
  res.status(200).send(goals.map((goal) => goal.toJSON()));
});

router.post('/', async (req, res) => {
  const body = CreateGoalBody.parse(req.body);
  const goal = await GoalModel.create(body);
  res.status(201).send(goal.toJSON());
});

router.get('/:id', async (req, res) => {
  const goal = await GoalModel.findByPk(Number.parseInt(req.params.id));
  if (!goal) {
    res.status(404).end();
  } else {
    res.status(200).send(goal.toJSON());
  }
});

router.put('/:id', async (req, res) => {
  const body = UpdateGoalBody.parse(req.body);
  const goal = await GoalModel.findByPk(Number.parseInt(req.params.id));
  if (!goal) {
    res.status(404).end();
  } else {
    goal.set(body);
    await goal.save();
    res.status(200).send(goal.toJSON());
  }
});

router.delete('/:id', async (req, res) => {
  const goal = await GoalModel.findByPk(Number.parseInt(req.params.id));
  if (!goal) {
    res.status(404).end();
  } else {
    await goal.destroy();
    res.status(200).end();
  }
});

export { router as GoalController };
