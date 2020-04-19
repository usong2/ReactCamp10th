test("adds 1 + 2 to equal 3", () => {
  expect(1 + 2).toBe(3);
});

describe("expect test", () => {
  it("37 to equal 37", () => {
    const received = 37;
    const expected = 37;
    expect(received).toBe(expected);
  });

  it.skip("{age: 37} to equal {age: 37}", () => {
    const received = {
      age: 37,
    };
    const expected = {
      age: 37,
    };
    expect(received).toBe(expected);
  });

  it("{age: 37} to equal {age: 37}", () => {
    const received = {
      age: 37,
    };
    const expected = {
      age: 37,
    };
    expect(received).toEqual(expected);
  });
});

describe(".to~ test", () => {
  it(".toBe", () => {
    expect(37).toBe(37);
  });

  it(".toHaveLength", () => {
    expect("hello").toHaveLength(5);
  });

  it(".toHaveProperty", () => {
    expect({ name: "Mark" }).toHaveProperty("name");
    expect({ name: "Mark" }).toHaveProperty("name", "Mark");
  });

  it(".toBeDefined", () => {
    expect({ name: "Mark" }.name).toBeDefined();
  });

  it(".toBeFalsy", () => {
    expect(false).toBeFalsy();
    expect(0).toBeFalsy();
    expect("").toBeFalsy();
    expect(null).toBeFalsy();
    expect(undefined).toBeFalsy();
    expect(NaN).toBeFalsy();
  });

  it(".toBeGreaterThan", () => {
    expect(10).toBeGreaterThan(9);
  });

  it(".toBeGreaterThanOrEqual", () => {
    expect(10).toBeGreaterThanOrEqual(10);
  });

  it(".toBeInstanceOf", () => {
    class Foo {}
    expect(new Foo()).toBeInstanceOf(Foo);
  });

  it(".toBeNull", () => {
    expect(null).toBeNull();
  });

  it(".toBeTruthy", () => {
    expect(true).toBeTruthy();
    expect(1).toBeTruthy();
    expect("hello").toBeTruthy();
    expect({}).toBeTruthy();
  });

  it(".toBeUndefined", () => {
    expect({ name: "Mark" }.age).toBeUndefined();
  });

  it(".toBeNaN", () => {
    expect(NaN).toBeNaN();
  });
});

describe(".not.to~ test", () => {
  it(".not.toBe", () => {
    expect(37).not.toBe(36);
  });

  it(".not.toBeFalsy", () => {
    expect(true).not.toBeFalsy();
    expect(1).not.toBeFalsy();
    expect("hello").not.toBeFalsy();
    expect({}).not.toBeFalsy();
  });

  it(".not.toBeGreaterThan", () => {
    expect(10).not.toBeGreaterThan(10);
  });
});

describe("use async test", () => {
  // Do not use like this
  it.skip("setTimeout without done", () => {
    setTimeout(() => {
      expect(37).toBe(36);
    }, 1000);
  });

  it("setTimeout with done", (done) => {
    setTimeout(() => {
      expect(37).toBe(37);
      done();
    }, 1000);
  });

  it("promise then", () => {
    function p() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(37);
        }, 1000);
      });
    }
    return p().then((data) => expect(data).toBe(37));
  });

  it("promise catch", () => {
    function p() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error("error"));
        }, 1000);
      });
    }
    return p().catch((e) => expect(e).toBeInstanceOf(Error));
  });

  it("promise .resolves", () => {
    function p() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(37);
        }, 1000);
      });
    }
    return expect(p()).resolves.toBe(37);
  });

  it("promise .rejects", () => {
    function p() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error("error"));
        }, 1000);
      });
    }
    return expect(p()).rejects.toBeInstanceOf(Error);
  });

  it("async-await", async () => {
    function p() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(37);
        }, 1000);
      });
    }

    const data = await p();
    return expect(data).toBe(37);
  });

  it("async-await, catch", async () => {
    function p() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error("error"));
        }, 1000);
      });
    }

    try {
      await p();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
