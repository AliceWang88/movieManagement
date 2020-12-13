// entities ：实体数据
// 电影数据

import "reflect-metadata";
import { ArrayNotEmpty, ArrayMinSize, validate, IsInt, Min, Max, IsNotEmpty } from "class-validator";
import { Type , plainToClass} from "class-transformer";
import { BaseEntity } from "./BaseEntity";

export class Movie extends BaseEntity {
    @IsNotEmpty({ message: '电影名称不能为空' })
    @Type(() => String)  // 运行时是字符串 大写
    name: string;  // 这里的类型限制编译时才有效，运行时可以被赋值为任意类型

    @IsNotEmpty({ message: '电影类型不能为空' })
    @ArrayNotEmpty({ message: '电影类型必须是数组，并且至少1个' }) // 是数组，并且至少1个
    @Type(() => String)  // 运行时告诉说这是字符串 把数组里的非字符串自动转换成字符串
    types: string[]

    // @IsNotEmpty({ message: '上映地区不能为空' })
    @ArrayMinSize(1, { message: '上映地区得是数组，并且至少1个' })
    @Type(() => String)
    areas: string[]

    @IsNotEmpty({ message: '时长不能为空' })
    @IsInt({ message: '时长必须是整数' })
    @Min(1, { message: '时长最小1分钟' })
    @Max(999999, { message: '时长太长' })
    @Type(() => Number)
    timeLong: number

    @IsNotEmpty({ message: '是否热映不能为空' })
    @Type(() => Boolean)
    isHot: boolean = false;

    @IsNotEmpty({ message: '是否即将上映不能为空' })
    @Type(() => Boolean)
    isComing: boolean = false;

    @IsNotEmpty({ message: '是否经典不能为空' })
    @Type(() => Boolean)
    isClasic: boolean = false;

    @Type(() => String)
    intro?: string; // 简介 可选

    @Type(() => String)
    poster?: string; // 海报图 可选 有默认


    /**
     * 平面对象 转 Movie类对象
     * @param plainObject 平面对象 或 Movie对象
     */
    static transform(plainObject:object):Movie {
        return super.basetransform(this,plainObject);
    }
}

