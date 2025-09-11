import { IsEnum, IsString, IsStrongPassword } from "class-validator";
import { Status } from "src/entities/appointment.entity";

export class CreateAppointmentDto {
    @IsString()
    appointmentId: string
    
    @IsString()
    doctorId: string;

    @IsString()
    patientId: string;

    @IsEnum(Status)
    status: Status

    @IsString()
    notes: string


}
