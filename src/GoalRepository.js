import { db } from './db.js';
import { GoalModel } from './GoalModel.js';
import { SQL } from './SQL.js';

export class GoalRepository {
  /**
   * @param {any} row
   */
  #modelFromRow(row) {
    const goal = new GoalModel();
    goal.id = row.id;
    goal.name = row.name;
    return goal;
  }

  /**
   * @param {number} id
   */
  get(id) {
    const row = SQL`
      SELECT id, name
      FROM goals
      WHERE id = ${id}
    `.get(db);

    return this.#modelFromRow(row);
  }

  getAll() {
    return SQL`
      SELECT id, name
      FROM goals
    `
      .all(db)
      .map(this.#modelFromRow);
  }

  /**
   * @param {GoalModel} goal
   */
  save(goal) {
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

  /**
   * @param {number} id
   */
  delete(id) {
    SQL`
      DELETE FROM goals
      WHERE id = ${id}
    `.run(db);
  }
}
