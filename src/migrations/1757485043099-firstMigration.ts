import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1757485043099 implements MigrationInterface {
    name = 'FirstMigration1757485043099'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "receptionist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "departmentId" uuid NOT NULL, CONSTRAINT "REL_c1aaf61be36e1f46996b4c2b41" UNIQUE ("userId"), CONSTRAINT "PK_5c742497ce1160914472e0b0df0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c1aaf61be36e1f46996b4c2b41" ON "receptionist" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2b8252bcccbb5070a12cd1b7e1" ON "receptionist" ("departmentId") `);
        await queryRunner.query(`CREATE TABLE "department" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "description" character varying(500) NOT NULL, CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "prescription" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "appointmentId" uuid NOT NULL, "doctorId" uuid NOT NULL, "medication" jsonb NOT NULL, "notes" character varying(500) NOT NULL, CONSTRAINT "PK_eaba5e4414e5382781e08467b51" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_432108890b812a8a65eb964741" ON "prescription" ("appointmentId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3e4a39a72939d42f31039f25ae" ON "prescription" ("doctorId") `);
        await queryRunner.query(`CREATE TABLE "shift_schedule" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "doctorId" uuid NOT NULL, "startTime" date NOT NULL, "endTime" date NOT NULL, "day" character varying NOT NULL, CONSTRAINT "PK_2f6fdb84d4580107ffeec6f34d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_30512e010c1c6c37a51551bb59" ON "shift_schedule" ("doctorId") `);
        await queryRunner.query(`CREATE TABLE "doctor" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "specialization" character varying(100) NOT NULL, "departmentId" uuid NOT NULL, "availableSlots" jsonb, CONSTRAINT "REL_e573a17ab8b6eea2b7fe9905fa" UNIQUE ("userId"), CONSTRAINT "PK_ee6bf6c8de78803212c548fcb94" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e573a17ab8b6eea2b7fe9905fa" ON "doctor" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7efd70d19bf6ee451fa2280297" ON "doctor" ("departmentId") `);
        await queryRunner.query(`CREATE TABLE "appointment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "doctorId" uuid NOT NULL, "patientId" uuid NOT NULL, "status" character varying NOT NULL, "notes" character varying(500) NOT NULL, CONSTRAINT "PK_e8be1a53027415e709ce8a2db74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_514bcc3fb1b8140f85bf1cde6e" ON "appointment" ("doctorId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5ce4c3130796367c93cd817948" ON "appointment" ("patientId") `);
        await queryRunner.query(`CREATE TABLE "bill" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "patientId" uuid NOT NULL, "appointmentId" uuid NOT NULL, "amount" numeric(10,2) NOT NULL, "status" character varying NOT NULL, "issueDate" date NOT NULL, CONSTRAINT "PK_683b47912b8b30fe71d1fa22199" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c7b994d14b8423bb5b88134ea8" ON "bill" ("patientId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6cbb37a97bee4caec2658f552c" ON "bill" ("appointmentId") `);
        await queryRunner.query(`CREATE TABLE "ward" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "capacity" numeric NOT NULL, CONSTRAINT "PK_e6725fa4a50e449c4352d2230e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "room_assign" ("id" SERIAL NOT NULL, "patientId" uuid NOT NULL, "wardId" uuid NOT NULL, "checkIn" date NOT NULL, "checkOut" date, CONSTRAINT "PK_fce6c58cd728f62fb92ea45f8b1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_06e185753688cdaa3e57f35420" ON "room_assign" ("patientId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f8361ee6c6b4947eeeedf533f2" ON "room_assign" ("wardId") `);
        await queryRunner.query(`CREATE TYPE "public"."patients_gender_enum" AS ENUM('MALE', 'FEMALE', 'OTHER')`);
        await queryRunner.query(`CREATE TABLE "patients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "dob" date NOT NULL, "gender" "public"."patients_gender_enum" NOT NULL, "insuranceInfo" character varying, CONSTRAINT "REL_2c24c3490a26d04b0d70f92057" UNIQUE ("userId"), CONSTRAINT "PK_a7f0b9fcbb3469d5ec0b0aceaa7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2c24c3490a26d04b0d70f92057" ON "patients" ("userId") `);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "email" character varying(200) NOT NULL, "role" character varying NOT NULL, "password" character varying(200) NOT NULL, "phone" character varying(15) NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "receptionist" ADD CONSTRAINT "FK_c1aaf61be36e1f46996b4c2b414" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "receptionist" ADD CONSTRAINT "FK_2b8252bcccbb5070a12cd1b7e1b" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "prescription" ADD CONSTRAINT "FK_3e4a39a72939d42f31039f25ae6" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shift_schedule" ADD CONSTRAINT "FK_30512e010c1c6c37a51551bb597" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD CONSTRAINT "FK_e573a17ab8b6eea2b7fe9905fa8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doctor" ADD CONSTRAINT "FK_7efd70d19bf6ee451fa2280297c" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_514bcc3fb1b8140f85bf1cde6e2" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_5ce4c3130796367c93cd817948e" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bill" ADD CONSTRAINT "FK_c7b994d14b8423bb5b88134ea80" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bill" ADD CONSTRAINT "FK_6cbb37a97bee4caec2658f552cb" FOREIGN KEY ("appointmentId") REFERENCES "appointment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room_assign" ADD CONSTRAINT "FK_06e185753688cdaa3e57f35420f" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room_assign" ADD CONSTRAINT "FK_f8361ee6c6b4947eeeedf533f29" FOREIGN KEY ("wardId") REFERENCES "ward"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patients" ADD CONSTRAINT "FK_2c24c3490a26d04b0d70f92057a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patients" DROP CONSTRAINT "FK_2c24c3490a26d04b0d70f92057a"`);
        await queryRunner.query(`ALTER TABLE "room_assign" DROP CONSTRAINT "FK_f8361ee6c6b4947eeeedf533f29"`);
        await queryRunner.query(`ALTER TABLE "room_assign" DROP CONSTRAINT "FK_06e185753688cdaa3e57f35420f"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP CONSTRAINT "FK_6cbb37a97bee4caec2658f552cb"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP CONSTRAINT "FK_c7b994d14b8423bb5b88134ea80"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_5ce4c3130796367c93cd817948e"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_514bcc3fb1b8140f85bf1cde6e2"`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP CONSTRAINT "FK_7efd70d19bf6ee451fa2280297c"`);
        await queryRunner.query(`ALTER TABLE "doctor" DROP CONSTRAINT "FK_e573a17ab8b6eea2b7fe9905fa8"`);
        await queryRunner.query(`ALTER TABLE "shift_schedule" DROP CONSTRAINT "FK_30512e010c1c6c37a51551bb597"`);
        await queryRunner.query(`ALTER TABLE "prescription" DROP CONSTRAINT "FK_3e4a39a72939d42f31039f25ae6"`);
        await queryRunner.query(`ALTER TABLE "receptionist" DROP CONSTRAINT "FK_2b8252bcccbb5070a12cd1b7e1b"`);
        await queryRunner.query(`ALTER TABLE "receptionist" DROP CONSTRAINT "FK_c1aaf61be36e1f46996b4c2b414"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2c24c3490a26d04b0d70f92057"`);
        await queryRunner.query(`DROP TABLE "patients"`);
        await queryRunner.query(`DROP TYPE "public"."patients_gender_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f8361ee6c6b4947eeeedf533f2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_06e185753688cdaa3e57f35420"`);
        await queryRunner.query(`DROP TABLE "room_assign"`);
        await queryRunner.query(`DROP TABLE "ward"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6cbb37a97bee4caec2658f552c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c7b994d14b8423bb5b88134ea8"`);
        await queryRunner.query(`DROP TABLE "bill"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5ce4c3130796367c93cd817948"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_514bcc3fb1b8140f85bf1cde6e"`);
        await queryRunner.query(`DROP TABLE "appointment"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7efd70d19bf6ee451fa2280297"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e573a17ab8b6eea2b7fe9905fa"`);
        await queryRunner.query(`DROP TABLE "doctor"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_30512e010c1c6c37a51551bb59"`);
        await queryRunner.query(`DROP TABLE "shift_schedule"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3e4a39a72939d42f31039f25ae"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_432108890b812a8a65eb964741"`);
        await queryRunner.query(`DROP TABLE "prescription"`);
        await queryRunner.query(`DROP TABLE "department"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2b8252bcccbb5070a12cd1b7e1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c1aaf61be36e1f46996b4c2b41"`);
        await queryRunner.query(`DROP TABLE "receptionist"`);
    }

}
