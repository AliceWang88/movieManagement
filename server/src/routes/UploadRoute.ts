import Express from 'express'
const router = Express.Router();

import path from 'path'
import multer from 'multer';
import { ResponseHelper } from './ResponseHelper';

//
const storage = multer.diskStorage({
    // 文件保存路径设置
    destination: path.resolve(__dirname, '../../public/uploads/'),
    // destination(req, file, cb){
    //     cb(null, path.resolve(__dirname, '../../public/uploads/'))
    // },

    // 文件名设置
    filename: (req, file, cb) => {
        // 文件名格式：当前时间戳-随机6位数字字母.原文件后缀名
        const timeStamp = Date.now(); // new Date().getTime()
        const randomStr = Math.random().toString(36).slice(-6);
        const ext = path.extname(file.originalname); // . .png
        const filename = `${timeStamp}-${randomStr}${ext}`
        cb(null, filename)
    }
})

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 // 限制文件大小 kb字节  最大1M
        // MulterError: File too large
    },
    // dest: path.resolve(__dirname, '../../public/uploads'),  // 配置了storage，这里就失效了
    fileFilter(req, file, cb) { // 文件后缀名限制
        // 文件可上传白名单
        const whiteList = ['.jpg', '.png', '.gif', '.jiff', 'bmp'];
        // .jpg 拿到上传文件的后缀名
        const ext = path.extname(file.originalname);
        if (whiteList.includes(ext)) {
            cb(null, true) // 可以保存 
        } else {
            cb(new Error(`your extname of ${ext} is not supported`)) // err.message
        }
    }
})



// Content-Type: multipart/form-data;
// 文件上传路由
const mi = upload.single('imgfile');  
router.post('/', (req, res) => {  // 约定文件名必须是imgfile
    mi(req, res, (err) => {  // 处理错误
        if (err) {
            // 发生错误
            ResponseHelper.sendError(err.message, res);
        } else {
            // 上传文件 没问题 则返回 文件路径
            const url = `/uploads/${req.file.filename}`
            ResponseHelper.sendData(url, res);
        }
    })
})

export default router