import { PartialType } from '@nestjs/swagger';
import { CreateWardDto } from './create-ward-room.dto';

export class UpdateWardRoomDto extends PartialType(CreateWardDto) {}
