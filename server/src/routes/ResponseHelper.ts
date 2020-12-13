import { Response } from "express";
import { ISearchResult } from "../entities/CommonTypes";

// 响应的统一数据格式
export class ResponseHelper {
    /**
     * 响应一个错误
     * @param msg 
     * @param res 
     */
    static sendError(msg: string | string[], res: Response) {
        let err = '';
        if (Array.isArray(msg)) {
            err = msg.join(';')
        } else {
            err = msg;
        }
        res.send({
            err,
            data: null
        })
    }

    /**
     * 响应正常数据
     * @param data 
     */
    static sendData(data: any, res: Response) {
        res.send({
            err: '',
            data,
        })
    }

    /**
     * 响应分页数据
     * @param result 
     * @param res 
     */
    static sendPageData<T>(result: ISearchResult<T>, res: Response) {  // 分页查找返回类型 ISearchResult<T>
        if (result.errors.length > 0) {
            // 有错误
            this.sendError(result.errors, res);
        } else {
            // 没错误 响应分页数据
            res.send({
                err: '',
                data:result.data,
                total:result.count,
            })
        }
    }
}