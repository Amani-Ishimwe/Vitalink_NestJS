import { IsDateString, IsOptional } from "class-validator";

export class UpdateRoomDto{
    @IsOptional()
    @IsDateString()
    checkOut ?: Date
}