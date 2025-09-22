import { IsArray, IsNotEmpty, IsString, IsUUID, ValidateNested } from 'class-validator'; 
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class MedicationDto{

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    dosage: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    Instructions: string
}

export class CreatePrescriptionDto {

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    appointmentId: string

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    doctorId: string

    @IsArray()
    @ValidateNested({ each: true})
    @Type(() => MedicationDto)
    @IsNotEmpty()
    @ApiProperty()
    medications: MedicationDto[]

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    notes: string

}
