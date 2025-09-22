import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString, IsStrongPassword, IsUUID } from "class-validator";
import { Status } from "src/entities/appointment.entity";

export class CreateAppointmentDto {
    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    appointmentId: string
    
    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    doctorId: string;

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    patientId: string;

    @IsEnum(Status)
    @IsNotEmpty()
    @ApiProperty()
    status: Status

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    notes: string


}
