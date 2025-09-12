import { IsIn, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateWardDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsInt()
    capacity: number;

}
