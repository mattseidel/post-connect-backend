"use strict";
// base.repository.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const Maybe_1 = __importDefault(require("../utils/Maybe"));
class BaseRepository {
    constructor(model) {
        this.model = model;
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateData = { $set: data };
                const result = yield this.model.findByIdAndUpdate(id, updateData, {
                    new: true,
                });
                return result ? Maybe_1.default.just(result) : Maybe_1.default.nothing();
            }
            catch (error) {
                if (error instanceof Error) {
                    return Maybe_1.default.nothing().catchError(`Error updating document: ${error.message}`);
                }
                return Maybe_1.default.nothing().catchError("Error updating document");
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.model.findByIdAndDelete(id);
                return result ? Maybe_1.default.just(true) : Maybe_1.default.just(false);
            }
            catch (error) {
                if (error instanceof Error) {
                    return Maybe_1.default.nothing().catchError(`Error deleting document: ${error.message}`);
                }
                return Maybe_1.default.nothing().catchError("Error deleting document");
            }
        });
    }
    findOneByQuery(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.model.findOne(query);
                return result ? Maybe_1.default.just(result) : Maybe_1.default.nothing();
            }
            catch (error) {
                const errorMessage = error instanceof Error
                    ? `Error finding document: ${error.message}`
                    : "Error finding document";
                return Maybe_1.default.nothing().catchError(errorMessage);
            }
        });
    }
    findByQuery(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.model.find(query);
                return Maybe_1.default.just(result);
            }
            catch (error) {
                if (error instanceof Error) {
                    return Maybe_1.default.nothing().catchError(`Error finding documents by query: ${error.message}`);
                }
                return Maybe_1.default.nothing().catchError("Error finding documents by query");
            }
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.model.create(data);
                return Maybe_1.default.just(result);
            }
            catch (error) {
                if (error instanceof Error)
                    return Maybe_1.default.nothing().catchError(`Error creating document: ${error.message}`);
                return Maybe_1.default.nothing().catchError("Error creating document");
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.model.findById(id);
                return result ? Maybe_1.default.just(result) : Maybe_1.default.nothing();
            }
            catch (error) {
                if (error instanceof Error)
                    return Maybe_1.default.nothing().catchError(`Error finding document by ID: ${error.message}`);
                return Maybe_1.default.nothing().catchError("Error finding document by ID");
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.model.find();
                return Maybe_1.default.just(result);
            }
            catch (error) {
                if (error instanceof Error)
                    return Maybe_1.default.nothing().catchError(`Error finding all documents: ${error.message}`);
                return Maybe_1.default.nothing().catchError("Error finding all documents");
            }
        });
    }
}
exports.BaseRepository = BaseRepository;
