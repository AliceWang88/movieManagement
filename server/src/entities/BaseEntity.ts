import "reflect-metadata";
import { Type, plainToClass } from "class-transformer";
import { ArrayNotEmpty, ArrayMinSize, validate, IsInt, Min, Max, IsNotEmpty } from "class-validator";
import { Movie } from "./Movie";
import { ClassType } from "class-transformer/ClassTransformer";
export abstract class BaseEntity {
    /**
     * 验证
     * 当前电影对象 this
     * 使用：m.validateThis()
     * 返回值：['错误信息'] / []
     * @param skipMissingProperty 缺失属性是否验证
     */
    async validateThis(skipMissingProperty = false): Promise<string[]> {
        const aErrors = await validate(this, { skipUndefinedProperties: skipMissingProperty });
        const result: string[] = [];

        const res = aErrors.map(e => {
            if (e.constraints) {
                return Object.values(e.constraints)
            }
        });
        // [['电影名不能为空','时长不能为空'],['时长不能为空']]
        res.forEach(arr => {
            if (arr) {
                result.push(...arr);
            }
        })
        // ['电影类型必须是数组，并且至少1个' , '电影类型不能为空']
        return result
    }


    /**
     * 平面对象 转 Movie类对象
     * @param plainObject 平面对象 或 Movie对象
     */
    protected static basetransform <T>(cls: ClassType<T>,plainObject: object): T {        // 静态函数也可以继承
        if (plainObject instanceof cls) {
            return plainObject;
        }
        return plainToClass(cls, plainObject);
    }
}

// validateThis 返回值：从数据1 转换成 数据2

// 从数据1
// [
//     ValidationError {
//       target: Movie {
//         isHot: false,
//         isComing: false,
//         isClasic: false,
//         name: 'a',
//         areas: [Array],
//         timeLong: 120
//       },
//       value: undefined,
//       property: 'types',
//       children: [],
//       constraints: { arrayNotEmpty: '电影类型必须是数组，并且至少1个', isNotEmpty: '电影类型不能为空' }
//     }
//   ]

// 从数据2
// ['电影类型必须是数组，并且至少1个' , '电影类型不能为空']