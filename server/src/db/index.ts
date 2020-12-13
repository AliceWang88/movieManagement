// 数据库的连接启动
import Mongoose from 'mongoose';
Mongoose.set("useCreateIndex", true); // 作全局设置，mongoDB里作了一项更改，这里不敢完全弃用之前的，所以需单独设置下好跟mongoDB一致
Mongoose.connect(
    'mongodb://localhost/moviedb',        // 自动生成数据库 moviedb数据库名 默认端口号27017
    { useNewUrlParser: true, useUnifiedTopology: true,serverSelectionTimeoutMS:35000 } // useNewUrlParser: true  表示：用了另外一个插件，对这个字符串进行解析 {里面内容为了解除警告}
).then(() => console.log('连接数据库成功'))


import MovieSchema, { IMovie } from './MovieSchema'  // 集合结构  表

export { MovieSchema, IMovie }