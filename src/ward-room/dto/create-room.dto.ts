import { IsDateString, IsString } from "class-validator";

export class CreateRoomAssignDto{

    @IsString()
    patientId: string;

    @IsString()
    wardId: string

    @IsDateString()
    checkIn: Date
}