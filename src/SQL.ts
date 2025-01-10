import type { Database } from 'better-sqlite3';

export class SQLStatement<RowType, ArgsType extends unknown[]> {
  constructor(
    private template: TemplateStringsArray,
    private substitutions: ArgsType,
  ) {}

  #getSQL() {
    return this.template.join('?');
  }

  #log() {
    console.log('[SQL]', this.#getSQL().trim(), this.substitutions);
  }

  #prepare(db: Database) {
    return db.prepare<ArgsType, RowType>(this.#getSQL());
  }

  run(db: Database) {
    this.#log();
    return this.#prepare(db).run(this.substitutions);
  }

  get(db: Database) {
    this.#log();
    return this.#prepare(db).get(this.substitutions);
  }

  all(db: Database) {
    this.#log();
    return this.#prepare(db).all(this.substitutions);
  }
}

export function SQL<RowType, ArgsType extends unknown[]>(
  template: TemplateStringsArray,
  ...substitutions: ArgsType
) {
  return new SQLStatement<RowType, ArgsType>(template, substitutions);
}
