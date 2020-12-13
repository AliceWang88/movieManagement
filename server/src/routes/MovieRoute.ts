import Express from 'express'
const router = Express.Router();

import { MovieService } from '../services/MovieService'
import { ResponseHelper } from './ResponseHelper';

// id 查询 电影信息
router.get('/:id', async (req, res) => {
    try {
        const movie = await MovieService.findById(req.params.id)
        // 调用函数发送统一格式的响应数据
        ResponseHelper.sendData(movie, res);
    } catch (err) {
        // id不正确，不能转换为ObjectId
        ResponseHelper.sendData(null, res);
    }
})
// 分页 查询 电影信息
router.get('/', async (req, res) => {
    // console.log(req.query); // { page: '1', limit: '3', key: '1' }
    const result = await MovieService.find(req.query as any)
    // 调用函数发送统一格式的响应数据
    ResponseHelper.sendPageData(result, res);
})
// 添加一个电影
router.post('/', async (req, res) => {
    const result = await MovieService.add(req.body);
    if (Array.isArray(result)) {
        ResponseHelper.sendError(result, res);
    } else {
        ResponseHelper.sendData(result, res);
    }
})
//  id 修改 一个电影数据
router.put('/:id', async (req, res) => {
    try {
        const result = await MovieService.update(req.params.id, req.body);
        if (result.length > 0) {
            // 修改信息验证不通过
            ResponseHelper.sendError(result, res);
        } else {
            // 修改成功
            ResponseHelper.sendData(true, res)
        }
    } catch (error) {
        // id 错误 不能被objectId 解析
        ResponseHelper.sendError('id错误', res);
    }
})
// id 删除 一个电影
router.delete('/:id', async (req, res) => {
    try {
        const resp = await MovieService.delete(req.params.id);
        ResponseHelper.sendData(resp.n, res)
    } catch (error) {
        // id 错误 不能被objectId 解析
        ResponseHelper.sendError('id错误', res);
    }
})

export default router

// 404 not fund : 表示没有路由处理请求