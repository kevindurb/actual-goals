import { Task } from '@lit/task';
import type { z } from 'zod';
import type { ReactiveController, ReactiveControllerHost } from 'lit';
import type { Goal } from '../../src/GoalModel.ts';
import type { CreateGoalBody } from '../../src/GoalController.ts';

export type { Goal };
export type CreateGoalBodyType = z.infer<typeof CreateGoalBody>;

export class GoalsController implements ReactiveController {
  listTask: Task<[], Goal[]>;
  createTask: Task<[CreateGoalBodyType], Goal>;

  constructor(host: ReactiveControllerHost) {
    this.listTask = new Task<[], Goal[]>(host, {
      task: () => fetch('/api/goals').then((res) => res.json()),
      args: () => [],
    });

    this.createTask = new Task<[CreateGoalBodyType], Goal>(host, {
      task: ([body]) =>
        fetch('/api/goals', {
          method: 'POST',
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
        }).then((res) => res.json()),
    });
  }

  hostConnected(): void {}
}
