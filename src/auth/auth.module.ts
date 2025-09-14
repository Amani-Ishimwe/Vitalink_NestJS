import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Patient } from 'src/entities/patient.entity';
import { Appointment } from 'src/entities/appointment.entity';
import { Doctor } from 'src/entities/doctor.entity';
import { Receptionist } from 'src/entities/reception.entity';
import { Department } from 'src/entities/department.entity';
import { Prescription } from 'src/entities/prescription.entity';
import { Ward } from 'src/entities/ward.entity';
import { RoomAssign } from 'src/entities/roomAssign.entity';
import { ShiftSchedule } from 'src/entities/shiftSchedule.entity';
import { Bill } from 'src/entities/bill.entity';
import { JwtStrategy } from './jwt.strategy/jwt.strategy';
import { LocalStrategy } from './local.strategy/local.strategy';

@Module({
  imports:[
  TypeOrmModule.forFeature([
     User, 
  ]),
  PassportModule,
  JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory:  async (configService : ConfigService) =>({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: {expiresIn: '1d'}
    }),
    inject: [ConfigService],
  })
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
