import Express from 'express'
import MovieRouter from './routes/MovieRoute'
import UploadRouter from './routes/UploadRoute'
import history from 'connect-history-api-fallback';

const app = Express();

// 访问别的地址，映射到一个地址
app.use(history());

// 图片等静态资源 访问路径设置
app.use('/uploads',Express.static("public/uploads"))  // const url = `/uploads/${req.file.filename}` 要一致！
app.use('/',Express.static("public/build"))
// app.use('/uploads',Express.static("public/uploads"))


// 配置中间件，用于解析消息体中的json格式
app.use(Express.json());

// 配置请求接口
app.use('/api/movie',MovieRouter)

// 文件上传接口  注意 前面/
app.use('/api/upload',UploadRouter)



app.listen(3006)
