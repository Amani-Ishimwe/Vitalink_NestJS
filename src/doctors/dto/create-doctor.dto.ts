import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateDoctorDto {

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    specialization: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    departmentId: string;
}
