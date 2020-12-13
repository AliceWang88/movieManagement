import { MovieSchema, IMovie } from '../db';
import { ISearchResult } from '../entities/CommonTypes';
import { Movie } from "../entities/Movie";
import { SearchCondition } from '../entities/SearchCondition';


// const parseConf: any = [];

// function trans(type: string) {
//     return function (target: MovieService, name: string, index: number) {
//         parseConf[index] = type;
//     };
// }
// // 在函数调用前执行
// function validate(target: MovieService, name: string, descriptor: PropertyDescriptor) {
//     const originalMethod = descriptor.value;
//     descriptor.value = async function (...args: any[]) {
//         for (let index = 0; index < parseConf.length; index++) {
//             const type = parseConf[index];
//             if (!type) {
//                 continue;
//             }
//             if (type === 'Movie') {
//                 args[index] = Movie.transform(args[index]);
//                 const aRes = await args[index].validateThis();
//                 if (aRes.length > 0) {
//                     return aRes;  // 返回错误信息，结束
//                 } else {
//                     return originalMethod.apply(this, args); // 继续原函数的执行
//                 }
//             }
//         }
//     };
//     return descriptor;
// }

export class MovieService {

    // @validate
    // // tslint:disable-next-line: no-unused-expression
    // static async addMovie(@trans("Movie") movie: Movie): Promise<IMovie | string[]> {
    //     // 验证成功
    //     // 添加到数据库
    //     console.log('验证成功');
    //     return await MovieSchema.create(movie);  // 返回IMovie
    // }

    /**
     * 添加电影 到数据库
     * 成功 返回 电影对象 IMovie       // 因为接口继承了Mongoose.Document，所以带_id
     * 失败 返回 错误信息数组 [string]
     * @param movie 电影对象
     */
    static async add(movie: Movie): Promise<IMovie | string[]> {
        // 数据转换 参数可能是平面对象  需转换
        movie = Movie.transform(movie);
        // 验证数据
        const aErrors = await movie.validateThis();
        // 验证失败  返回错误信息
        if (aErrors.length > 0) {
            // 返回错误信息数组
            return aErrors;
        }
        // 验证成功
        // 添加到数据库
        return await MovieSchema.create(movie);  // 返回IMovie
    }

    static async update(id: string, movie: Movie): Promise<string[]> {
        // 数据转换 参数可能是平面对象  需转换
        const movieObj = Movie.transform(movie);
        // 验证数据
        const aErrors = await movieObj.validateThis(true); // true 跳过缺失属性验证
        // 验证失败  返回错误信息
        if (aErrors.length > 0) {
            // 返回错误信息数组
            console.log('验证失败');
            return aErrors;
        }
        // 验证成功
        // 添加到数据库
        console.log('验证成功');
        await MovieSchema.updateOne({ _id: id }, movie);  // 修改添加的是平面对象 Movie对象会把默认值添加进来修改
        return []
    }

    static async delete(id: string): Promise<any> {
        const resp = await MovieSchema.deleteOne({ _id: id });
        return resp;
    }

    // id查询
    static async findById(id: string): Promise<IMovie | null> {
        return await MovieSchema.findById(id);
    }

/**
 * 分页关键字查询
 * @param condition : page、limit、key
 */
static async find(condition: SearchCondition): Promise< ISearchResult<IMovie> > {
    // 数据转换 参数可能是平面对象  需转换
    const conObj = SearchCondition.transform(condition);
    // 验证数据
    const aErrors = await conObj.validateThis(); // true 跳过缺失属性验证
    // 验证失败  返回错误信息
    if (aErrors.length > 0) {
        // 返回错误信息数组
        console.log('验证失败');
        return {
            count:0,
            errors:aErrors,
            data:[],
        }
    }
    // 验证成功
    // 操作数据库  查询
    const movies = await MovieSchema.find({
        name: {   // 名字 模糊查询
            $regex: new RegExp(conObj.key)
        }
    }).skip((conObj.page - 1) * conObj.limit).limit(conObj.limit);
    const count = await MovieSchema.find({
        name: {   // 名字 模糊查询
            $regex: new RegExp(conObj.key)
        }
    }).countDocuments();

    return {
        count,
        errors:[],
        data:movies,
    }
}
}