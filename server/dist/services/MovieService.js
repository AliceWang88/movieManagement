var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const Movie_1 = require("../entities/Movie");
const SearchCondition_1 = require("../entities/SearchCondition");
class MovieService {
    static add(movie) {
        return __awaiter(this, void 0, void 0, function* () {
            movie = Movie_1.Movie.transform(movie);
            const aErrors = yield movie.validateThis();
            if (aErrors.length > 0) {
                return aErrors;
            }
            return yield db_1.MovieSchema.create(movie);
        });
    }
    static update(id, movie) {
        return __awaiter(this, void 0, void 0, function* () {
            const movieObj = Movie_1.Movie.transform(movie);
            const aErrors = yield movieObj.validateThis(true);
            if (aErrors.length > 0) {
                console.log('验证失败');
                return aErrors;
            }
            console.log('验证成功');
            yield db_1.MovieSchema.updateOne({ _id: id }, movie);
            return [];
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield db_1.MovieSchema.deleteOne({ _id: id });
            return resp;
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.MovieSchema.findById(id);
        });
    }
    static find(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const conObj = SearchCondition_1.SearchCondition.transform(condition);
            const aErrors = yield conObj.validateThis();
            if (aErrors.length > 0) {
                console.log('验证失败');
                return {
                    count: 0,
                    errors: aErrors,
                    data: [],
                };
            }
            const movies = yield db_1.MovieSchema.find({
                name: {
                    $regex: new RegExp(conObj.key)
                }
            }).skip((conObj.page - 1) * conObj.limit).limit(conObj.limit);
            const count = yield db_1.MovieSchema.find({
                name: {
                    $regex: new RegExp(conObj.key)
                }
            }).countDocuments();
            return {
                count,
                errors: [],
                data: movies,
            };
        });
    }
}
exports.MovieService = MovieService;
