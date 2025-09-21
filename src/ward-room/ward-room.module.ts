import { Module } from '@nestjs/common';
import { WardsService } from './ward-room.service';
import {  WardsController } from './ward-room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ward } from 'src/entities/ward.entity';
import { RoomAssign } from 'src/entities/roomAssign.entity';
import { Patient } from 'src/entities/patient.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([Ward, RoomAssign, Patient])
  ],
  controllers: [WardsController],
  providers: [WardsService],
})
export class WardRoomModule {}
