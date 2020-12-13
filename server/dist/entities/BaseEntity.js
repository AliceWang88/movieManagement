var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class BaseEntity {
    validateThis(skipMissingProperty = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const aErrors = yield class_validator_1.validate(this, { skipUndefinedProperties: skipMissingProperty });
            const result = [];
            const res = aErrors.map(e => {
                if (e.constraints) {
                    return Object.values(e.constraints);
                }
            });
            res.forEach(arr => {
                if (arr) {
                    result.push(...arr);
                }
            });
            return result;
        });
    }
    static basetransform(cls, plainObject) {
        if (plainObject instanceof cls) {
            return plainObject;
        }
        return class_transformer_1.plainToClass(cls, plainObject);
    }
}
exports.BaseEntity = BaseEntity;
