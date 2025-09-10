import { IsString } from "class-validator";

export class CreateReceptionistDto {
    @IsString()
    userId: string;

    @IsString()
    departmentId: string;
}
