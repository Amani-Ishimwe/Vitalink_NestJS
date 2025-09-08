import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoomAssign } from "./roomAssign.entity";

@Entity()
export class Ward{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("varchar",{length: 255})
    name: string;

    @Column("decimal")
    capacity: number

    @OneToMany(() => RoomAssign, (roomAssign) => roomAssign.ward)
    ward: Ward
}