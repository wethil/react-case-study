export default class Resource<T> {
  private status: "pending" | "success" | "error" = "pending";
  private result?: T;
  private error?: unknown;
  public readonly promise: Promise<T>;

  constructor(promise: Promise<T>) {
    this.promise = promise;
    // attach handlers so rejections are observed and status/error are recorded
    this.promise
      .then((res: T) => {
        this.status = "success";
        this.result = res;
      })
      .catch((err: unknown) => {
        this.status = "error";
        this.error = err;
      });
  }

  read(): T {
    if (this.status === "pending") {
      throw this.promise;
    }
    if (this.status === "error") {
      throw this.error;
    }
    return this.result as T;
  }
}
