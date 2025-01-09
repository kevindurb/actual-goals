/** @typedef {import("better-sqlite3").Database} Database */
/** @typedef {import("better-sqlite3").Statement} Statement */

/**
 * @template {unknown} RowType
 * @template {unknown[]} ArgsType
 */
export class SQLStatement {
  template;
  substitutions;

  /**
   * @param {TemplateStringsArray} template
   * @param {ArgsType} substitutions
   */
  constructor(template, substitutions) {
    this.template = template;
    this.substitutions = substitutions;
  }

  _getSQL() {
    return this.template.join('?');
  }

  _log() {
    console.log('[SQL]', this._getSQL().trim(), this.substitutions);
  }

  /**
   * @param {Database} db
   */
  run(db) {
    this._log();

    const stmt = db.prepare(this._getSQL());
    return stmt.run(this.substitutions);
  }

  /**
   * @param {Database} db
   * @returns {RowType}
   */
  get(db) {
    this._log();

    /** @type {import("better-sqlite3").Statement<ArgsType, RowType>} */
    const stmt = db.prepare(this._getSQL());
    return stmt.get(this.substitutions);
  }

  /**
   * @param {Database} db
   * @returns {RowType[]}
   */
  all(db) {
    this._log();

    /** @type {import("better-sqlite3").Statement<ArgsType, RowType>} */
    const stmt = db.prepare(this._getSQL());
    return stmt.all(this.substitutions);
  }
}

/**
 * @template {unknown[]} ArgsType
 * @param {TemplateStringsArray} template
 * @param {ArgsType} substitutions
 */
export function SQL(template, ...substitutions) {
  return new SQLStatement(template, substitutions);
}
