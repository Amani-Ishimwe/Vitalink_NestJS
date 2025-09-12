import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBillingDto {
  @IsString()
  patientId: string;

  @IsString()
  appointmentId: string;

  @IsNumber()
  amount: number;

  @IsEnum(["PENDING", "PAID", "OVERDUE"])
  @IsOptional()
  status?: string;
}
