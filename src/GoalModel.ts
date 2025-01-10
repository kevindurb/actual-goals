export class GoalModel {
  id: number | undefined;
  name = '';

  json() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
