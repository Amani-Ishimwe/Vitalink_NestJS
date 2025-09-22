import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateWardDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string

    @IsInt()
    @IsNotEmpty()
    @ApiProperty()
    capacity: number;

}
