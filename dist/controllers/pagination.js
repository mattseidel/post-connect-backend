"use strict";
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
exports.Pagination = void 0;
const Maybe_1 = __importDefault(require("../utils/Maybe"));
class Pagination {
    constructor(model, paginationOptions) {
        this.model = model;
        this.paginationOptions = paginationOptions;
    }
    getPaginatedData(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, pageSize } = this.paginationOptions;
            const skip = (page - 1) * pageSize;
            const totalCount = query
                ? yield this.model.countDocuments(query)
                : yield this.model.countDocuments();
            const data = query
                ? yield this.model.find(query).skip(skip).limit(pageSize)
                : yield this.model.find().skip(skip).limit(pageSize);
            return {
                totalCount,
                page,
                limit: pageSize,
                data,
            };
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paginatedResponse = yield this.getPaginatedData();
                return Maybe_1.default.just(paginatedResponse);
            }
            catch (error) {
                if (error instanceof Error)
                    return Maybe_1.default.nothing().catchError(`Error finding all documents: ${error.message}`);
                return Maybe_1.default.nothing().catchError("Error finding all documents");
            }
        });
    }
    findByQuery(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paginatedResponse = yield this.getPaginatedData(query);
                return Maybe_1.default.just(paginatedResponse);
            }
            catch (error) {
                if (error instanceof Error)
                    return Maybe_1.default.nothing().catchError(`Error finding all documents: ${error.message}`);
                return Maybe_1.default.nothing().catchError("Error finding all documents");
            }
        });
    }
}
exports.Pagination = Pagination;
