"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterProperties = void 0;
function filterProperties(obj, keys) {
    const filteredObject = {};
    keys.forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            filteredObject[key] = obj[key];
        }
    });
    return filteredObject;
}
exports.filterProperties = filterProperties;
