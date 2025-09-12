import { IsArray, IsString, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';

class MedicationDto{
    @IsString()
    name: string

    @IsString()
    dosage: string

    @IsString()
    Instructions: string
}
export class CreatePrescriptionDto {

    @IsString()
    appointmentId: string

    @IsString()
    doctorId: string

    @IsArray()
    @ValidateNested({ each: true})
    @Type(() => MedicationDto)
    medications: MedicationDto[]

    @IsString()
    notes: string

}
