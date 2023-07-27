"use strict";
// maybe.ts
Object.defineProperty(exports, "__esModule", { value: true });
class Maybe {
    constructor(value, errorLog = []) {
        this.value = value;
        this.errorLog = errorLog;
    }
    static just(value) {
        return new Maybe(value);
    }
    static nothing() {
        return new Maybe(null);
    }
    hasValue() {
        return this.value !== null;
    }
    getOrElse(defaultValue) {
        return this.value !== null ? this.value : defaultValue;
    }
    getValueOrThrow() {
        if (this.value !== null) {
            return this.value;
        }
        throw new Error("Value not present in Maybe");
    }
    catchError(error) {
        if (this.value !== null) {
            return this;
        }
        return new Maybe(null, [...this.errorLog, error]);
    }
    getErrorLog() {
        return this.errorLog;
    }
}
exports.default = Maybe;
