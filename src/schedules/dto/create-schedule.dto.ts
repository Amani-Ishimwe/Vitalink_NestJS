import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateScheduleDto {

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    doctorId: string

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty()
    startTime: Date;

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty()
    endTime: Date;

    @IsEnum(['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'])
    @IsNotEmpty()
    @ApiProperty()
    day: string;
}

