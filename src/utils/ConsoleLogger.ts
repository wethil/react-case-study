import type { Logger } from "@utils/ErrorLogger";

/**
 * ConsoleLogger implements Logger and logs errors to the browser console.
 */
export default class ConsoleLogger implements Logger {
  logError(error: Error, info?: unknown): void {
    console.error("ErrorBoundary caught:", error, info);
  }
}
