import { IsString } from "class-validator";

export class CreateDoctorDto {

    @IsString()
    userId: string;

    @IsString()
    specialization: string;

    @IsString()
    departmentId: string;
}
