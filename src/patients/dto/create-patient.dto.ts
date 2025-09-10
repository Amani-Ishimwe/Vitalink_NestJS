import { IsDate, IsEnum, IsString } from "class-validator";
import { Gender } from "src/entities/patient.entity";

export class CreatePatientDto {

    @IsString()
    userId: string;

    @IsDate()
    dob: Date;

    @IsEnum(Gender)
    gender: Gender;

    @IsString()
    insuranceInfo?: string;

}
