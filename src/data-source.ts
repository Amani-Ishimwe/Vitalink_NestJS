import { DataSource } from "typeorm";
import { User } from "./entities/user.entity";
import { Patient } from "./entities/patient.entity";

 const AppDataSource = new DataSource({
    type:"postgres",
    host:process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    entities: [User, Patient],
    logging: ["error","warn"]
})

export default AppDataSource;