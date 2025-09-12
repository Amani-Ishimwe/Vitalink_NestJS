import { IsDateString, IsEnum, IsString } from "class-validator";

export class CreateScheduleDto {

    @IsString()
    doctorId: string

    @IsDateString()
    startTime: Date;

    @IsDateString()
    endTime: Date;

    @IsEnum(['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'])
    day: string;
}

