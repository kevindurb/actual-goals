import { db } from './db.ts';
import { GoalModel } from './GoalModel.ts';
import { SQL } from './SQL.ts';

interface GoalRow {
  id: number;
  name: string;
}

export class GoalRepository {
  #modelFromRow(row: GoalRow) {
    const goal = new GoalModel();
    goal.id = row.id;
    goal.name = row.name;
    return goal;
  }

  get(id: number) {
    const row = SQL<GoalRow, [number]>`
      SELECT id, name
      FROM goals
      WHERE id = ${id}
    `.get(db);

    if (!row) return;

    return this.#modelFromRow(row);
  }

  getAll(): GoalModel[] {
    return SQL<GoalRow, []>`
      SELECT id, name
      FROM goals
    `
      .all(db)
      .map(this.#modelFromRow);
  }

  save(goal: GoalModel) {
    if (goal.id) {
      SQL`
        UPDATE goals
        SET name = ${goal.name}
        WHERE id = ${goal.id}
      `.run(db);
      return goal;
    }

    const result = SQL`
      INSERT INTO goals (name)
      VALUES (${goal.name})
    `.run(db);

    goal.id = Number(result.lastInsertRowid);
    return goal;
  }

  delete(id: number) {
    SQL`
      DELETE FROM goals
      WHERE id = ${id}
    `.run(db);
  }
}
