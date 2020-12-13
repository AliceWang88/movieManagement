var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const ResponseHelper_1 = require("./ResponseHelper");
const storage = multer_1.default.diskStorage({
    destination: path_1.default.resolve(__dirname, '../../public/uploads/'),
    filename: (req, file, cb) => {
        const timeStamp = Date.now();
        const randomStr = Math.random().toString(36).slice(-6);
        const ext = path_1.default.extname(file.originalname);
        const filename = `${timeStamp}-${randomStr}${ext}`;
        cb(null, filename);
    }
});
const upload = multer_1.default({
    storage,
    limits: {
        fileSize: 1024 * 1024
    },
    fileFilter(req, file, cb) {
        const whiteList = ['.jpg', '.png', '.gif', '.jiff', 'bmp'];
        const ext = path_1.default.extname(file.originalname);
        if (whiteList.includes(ext)) {
            cb(null, true);
        }
        else {
            cb(new Error(`your extname of ${ext} is not supported`));
        }
    }
});
const mi = upload.single('imgfile');
router.post('/', (req, res) => {
    mi(req, res, (err) => {
        if (err) {
            ResponseHelper_1.ResponseHelper.sendError(err.message, res);
        }
        else {
            const url = `/uploads/${req.file.filename}`;
            ResponseHelper_1.ResponseHelper.sendData(url, res);
        }
    });
});
exports.default = router;
