"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDuplicateError = void 0;
const handleDuplicateError = (err) => {
    const matchArray = err.message.match(/"([^"]*)"/);
    return {
        statuscode: 400,
        message: `${matchArray[1]} already exist`,
    };
};
exports.handleDuplicateError = handleDuplicateError;
