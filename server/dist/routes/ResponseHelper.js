Object.defineProperty(exports, "__esModule", { value: true });
class ResponseHelper {
    static sendError(msg, res) {
        let err = '';
        if (Array.isArray(msg)) {
            err = msg.join(';');
        }
        else {
            err = msg;
        }
        res.send({
            err,
            data: null
        });
    }
    static sendData(data, res) {
        res.send({
            err: '',
            data,
        });
    }
    static sendPageData(result, res) {
        if (result.errors.length > 0) {
            this.sendError(result.errors, res);
        }
        else {
            res.send({
                err: '',
                data: result.data,
                total: result.count,
            });
        }
    }
}
exports.ResponseHelper = ResponseHelper;
