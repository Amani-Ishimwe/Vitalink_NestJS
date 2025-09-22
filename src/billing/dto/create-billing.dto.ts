import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateBillingDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  patientId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  appointmentId: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  amount: number;

  
  @IsEnum(["PENDING", "PAID", "OVERDUE"])
  @IsNotEmpty()
  @ApiProperty()
  status?: string;
}
