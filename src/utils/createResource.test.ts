import Resource from "./createResource";

describe("Resource", () => {
  it("should initialize with pending status", () => {
    const promise = new Promise<string>((resolve) =>
      setTimeout(() => resolve("data"), 10)
    );
    const resource = new Resource(promise);
    // Status is private, but we can test behavior via read()
    try {
      resource.read();
      fail("Should have thrown the promise");
    } catch (thrown) {
      expect(thrown).toBe(promise);
    }
  });

  it("should resolve to success status and return result", async () => {
    const promise = Promise.resolve("success data");
    const resource = new Resource(promise);
    await promise; // Wait for resolution
    expect(resource.read()).toBe("success data");
  });

  it("should reject to error status and throw error", async () => {
    const error = new Error("test error");
    const promise = Promise.reject(error);
    const resource = new Resource(promise);
    await promise.catch(() => {}); // Wait for rejection
    expect(() => resource.read()).toThrow(error);
  });

  it("should throw the promise when read() is called while pending", () => {
    const promise = new Promise<string>((resolve) =>
      setTimeout(() => resolve("data"), 100)
    );
    const resource = new Resource(promise);
    try {
      resource.read();
      fail("Should have thrown the promise");
    } catch (thrown) {
      expect(thrown).toBe(promise);
    }
  });

  it("should handle multiple read() calls after resolution", async () => {
    const promise = Promise.resolve("cached data");
    const resource = new Resource(promise);
    await promise;
    expect(resource.read()).toBe("cached data");
    expect(resource.read()).toBe("cached data"); // Should return the same result
  });

  it("should handle multiple read() calls after rejection", async () => {
    const error = new Error("persistent error");
    const promise = Promise.reject(error);
    const resource = new Resource(promise);
    await promise.catch(() => {});
    expect(() => resource.read()).toThrow(error);
    expect(() => resource.read()).toThrow(error); // Should throw the same error
  });

  it("should work with different data types", async () => {
    const numberPromise = Promise.resolve(42);
    const objectPromise = Promise.resolve({ key: "value" });
    const arrayPromise = Promise.resolve([1, 2, 3]);

    const numberResource = new Resource(numberPromise);
    const objectResource = new Resource(objectPromise);
    const arrayResource = new Resource(arrayPromise);

    await Promise.all([numberPromise, objectPromise, arrayPromise]);

    expect(numberResource.read()).toBe(42);
    expect(objectResource.read()).toEqual({ key: "value" });
    expect(arrayResource.read()).toEqual([1, 2, 3]);
  });
});
