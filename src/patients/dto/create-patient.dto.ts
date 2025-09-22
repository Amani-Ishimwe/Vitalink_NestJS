import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { Gender } from "src/entities/patient.entity";

export class CreatePatientDto {

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    userId: string;

    @IsDate()
    @IsNotEmpty()
    @ApiProperty()
    dob: Date;

    @IsEnum(Gender)
    @IsNotEmpty()
    @ApiProperty()
    gender: Gender;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    insuranceInfo?: string;

}
