export default class Resource<T> {
  private status: "pending" | "success" | "error" = "pending";
  private result: T | undefined;
  private error: any;

  constructor(private promise: Promise<T>) {
    this.promise.then(
      (r) => {
        this.status = "success";
        this.result = r;
      },
      (e) => {
        this.status = "error";
        this.error = e;
      }
    );
  }

  read(): T {
    if (this.status === "pending") throw this.promise;
    if (this.status === "error") throw this.error;
    return this.result!;
  }
}
