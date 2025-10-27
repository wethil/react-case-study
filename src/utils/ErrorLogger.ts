export interface Logger {
  logError(error: Error, info?: unknown): void;
}

export default class ErrorLogger {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  log(error: Error, info?: unknown): void {
    this.logger.logError(error, info);
  }
}
