import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsOptional } from "class-validator";

export class UpdateRoomDto{
    @IsOptional()
    @IsDateString()
    @ApiProperty()
    checkOut ?: string
}