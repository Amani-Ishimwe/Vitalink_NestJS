import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateRoomAssignDto{

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    patientId: string;

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    wardId: string

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty()
    checkIn: Date
}