import { IsInt, Min } from "class-validator";
import { Type } from "class-transformer";
import { BaseEntity } from "./BaseEntity";

export class SearchCondition extends BaseEntity {
    /**
     * 页面，1开始
     */
    @IsInt({ message: '页码必须是整数' })
    @Min(1, { message: '页码最小值是1' })
    @Type(() => Number)  // 运行时转换成数字
    page: number = 1;
    /**
     * 页容量，每页查询数量 默认10
     */
    @IsInt({ message: '容量必须是整数' })
    @Min(1, { message: '容量最小值是1' })
    @Type(() => Number)  // 运行时转换成数字
    limit: number = 10;
    /**
     * 搜索关键字
     */
    @Type(() => String)  // 运行时转换成字符串
    key: string = '';

   /**
    * 平面对象 转 Movie类对象
    * @param plainObject 平面对象 或 Movie对象
    */
    static transform(plainObject: object): SearchCondition {
        return super.basetransform(this, plainObject);
    }
}