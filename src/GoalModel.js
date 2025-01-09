export class GoalModel {
  /** @type {number | undefined} */
  id;
  name = '';

  json() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
