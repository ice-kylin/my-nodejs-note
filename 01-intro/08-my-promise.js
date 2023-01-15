"use strict";

/*
 * # 定义类的思路
 *
 * 1. 先把功能都分析清楚了，在动手
 * 2. 写一点想一点，走一步看一步
 */
class MyPromise {
    #state = "pending";
    #result;
    #resolveCallbacks = [];
    #rejectCallbacks = [];

    constructor(executor) {
        try {
            executor(this.#resolve.bind(this), this.#reject.bind(this));
        } catch (e) {
            this.#reject.call(this, e);
        }
    }

    #resolve(value) {
        if (this.#state === "pending") {
            this.#state = "fulfilled";
            this.#result = value;

            queueMicrotask(() => {
                while (this.#resolveCallbacks.length > 0) {
                    this.#resolveCallbacks.shift()(this.#result);
                }
            });
        }
    }

    #reject(reason) {
        if (this.#state === "pending") {
            this.#state = "rejected";
            this.#result = reason;

            queueMicrotask(() => {
                while (this.#rejectCallbacks.length > 0) {
                    this.#rejectCallbacks.shift()(this.#result);
                }
            });
        }
    }

    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            const handleCallback = (cb) => {
                try {
                    const result = cb();
                    if (result instanceof MyPromise) {
                        result.then(resolve, reject);
                    } else {
                        resolve(result);
                    }
                } catch (e) {
                    reject(e);
                }
            };

            if (typeof onFulfilled === "function") {
                this.#resolveCallbacks.push((r) =>
                    handleCallback(() => onFulfilled(r)));
            } else {
                this.#resolveCallbacks.push((r) => handleCallback(() => r));
            }

            if (typeof onRejected === "function") {
                this.#rejectCallbacks.push((e) => handleCallback(() => onRejected(e)));
            } else {
                this.#rejectCallbacks.push((e) => {
                    handleCallback(() => {
                        throw e;
                    });
                });
            }
        });
    }
}

function sum(a, b) {
    return new MyPromise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a !== "number" || typeof b !== "number") {
                reject("a or b is not a number");
            } else {
                resolve(a + b);
            }
        }, 1000);
    });
}

new MyPromise((resolve) => {
    setTimeout(() => {
        resolve("p1: success");
    });
}).then((r) => {
    console.log(r);
});

new MyPromise((resolve) => {
    setTimeout(() => {
        resolve("p2: success");
    });
})
    .then()
    .then((r) => {
        console.log(r);
    });

new MyPromise(() => {
    throw new Error("p3: error");
}).then(
    () => {
    },
    (e) => {
        console.log(e);
    },
);

new MyPromise((resolve, reject) => {
    reject("p4: error");
})
    .then()
    .then(
        () => {
        },
        (e) => {
            console.log(e);
            console.log("我应该显示出来");
        },
    );

sum(1, 2)
    .then((r) => sum(r, 3))
    .then((r) => sum(r, 4))
    .then()
    .then((r) => {
        console.log(`sum 2: ${r}`);
    });
