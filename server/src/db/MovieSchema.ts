import Mongoose from 'mongoose';  // js写的  npm i -D @types/mongoose
import { Movie } from '../entities/Movie';
// import addressSchema from './addressSchema';

export interface IMovie extends Movie , Mongoose.Document{}  // Mongoose.Document 有id

// Movie集合结构的定义  同mysql里的表
const movieSchema = new Mongoose.Schema<IMovie>({ // 结构配置

    name:String,  // js类型在运行时生效
    types:[String],
    areas:[String],
    timeLong:Number,
    isHot:Boolean,
    isComing:Boolean,
    isClasic:Boolean,
    intro:String,
    poster:String,

},{versionKey:false});

export default Mongoose.model<IMovie>('Movie', movieSchema); // 把结构作为模型（集合），进行导出模型。这里的集合同mysql里的表