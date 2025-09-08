import { DataSource } from "typeorm";
import { User } from "./entities/user.entity";
import { Patient } from "./entities/patient.entity";
import { Doctor } from "./entities/doctor.entity";
import { Receptionist } from "./entities/reception.entity";
import { Department } from "./entities/department.entity";
import { Appointment } from "./entities/appointment.entity";
import { Prescription } from "./entities/prescription.entity";
import { Ward } from "./entities/ward.entity";
import { RoomAssign } from "./entities/roomAssign.entity";
import { ShiftSchedule } from "./entities/shiftSchedule.entity";
import { Bill } from "./entities/bill.entity";

 const AppDataSource = new DataSource({
    type:"postgres",
    host:process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    entities: [
        User, 
        Patient, 
        Doctor, 
        Receptionist, 
        Department, 
        Appointment, 
        Prescription,
        Ward,
        RoomAssign,
        ShiftSchedule,
        Bill
    ],
    logging: ["error","warn"]
})

export default AppDataSource;