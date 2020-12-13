var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set("useCreateIndex", true);
mongoose_1.default.connect('mongodb://localhost/moviedb', { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 35000 }).then(() => console.log('连接数据库成功'));
const MovieSchema_1 = __importDefault(require("./MovieSchema"));
exports.MovieSchema = MovieSchema_1.default;
