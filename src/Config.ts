export class Config {
  #port = 1337;
  #actualBudgetServerUrl = '';
  #actualBudgetPassword = '';
  #actualBudgetSyncId = '';

  loadFromEnv() {
    const env = process.env;
    if (env.PORT) this.#port = Number.parseInt(env.PORT);
    if (env.ACTUAL_BUDGET_SERVER_URL)
      this.#actualBudgetServerUrl = env.ACTUAL_BUDGET_SERVER_URL;
    if (env.ACTUAL_BUDGET_PASSWORD)
      this.#actualBudgetPassword = env.ACTUAL_BUDGET_PASSWORD;
    if (env.ACTUAL_BUDGET_SYNC_ID)
      this.#actualBudgetSyncId = env.ACTUAL_BUDGET_SYNC_ID;
  }

  get port() {
    return this.#port;
  }

  get actualBudgetServerUrl() {
    return this.#actualBudgetServerUrl;
  }

  get actualBudgetPassword() {
    return this.#actualBudgetPassword;
  }

  get actualBudgetSyncId() {
    return this.#actualBudgetSyncId;
  }
}
