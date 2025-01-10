import { Router } from 'express';
import { z } from 'zod';
import { GoalRepository } from './GoalRepository.ts';
import { GoalModel } from './GoalModel.ts';

const CreateGoalBody = z.object({
  name: z.string(),
});

const UpdateGoalBody = z.object({
  name: z.string(),
});

const goalRepository = new GoalRepository();

export const controller = Router();

controller.get('/goals', (_, res) => {
  res.status(200).send(goalRepository.getAll().map((g) => g.json()));
});

controller.post('/goals', async (req, res) => {
  const body = CreateGoalBody.parse(req.body);
  const goal = new GoalModel();
  goal.name = body.name;
  goalRepository.save(goal);

  res.status(201).send(goal.json());
});

controller.put('/goals/:id', async (req, res) => {
  const body = UpdateGoalBody.parse(req.body);
  const goal = goalRepository.get(Number.parseInt(req.params.id));
  if (!goal) {
    res.status(404).end();
  } else {
    goal.name = body.name;
    goalRepository.save(goal);

    res.status(200).send(goal.json());
  }
});

controller.delete('/goals/:id', async (req, res) => {
  goalRepository.delete(Number.parseInt(req.params.id));
  res.status(200).end();
});
