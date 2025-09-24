import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1758703207058 implements MigrationInterface {
    name = ' $npmConfigName1758703207058'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Receptionist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "departmentId" uuid NOT NULL, CONSTRAINT "REL_842e8fe87432f39db96c61915f" UNIQUE ("userId"), CONSTRAINT "PK_a82289d1fcdee7a9810d5ceaa78" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_842e8fe87432f39db96c61915f" ON "Receptionist" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_da37d3c191c57c082e8769b702" ON "Receptionist" ("departmentId") `);
        await queryRunner.query(`CREATE TABLE "Department" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "description" character varying(500) NOT NULL, CONSTRAINT "PK_2db7d829a31533bd913ef432dc2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Prescription" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "appointmentId" uuid NOT NULL, "doctorId" uuid NOT NULL, "medication" jsonb NOT NULL, "notes" character varying(500) NOT NULL, CONSTRAINT "PK_c2625294b9be1dc798a43fd7d10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5016c615f5ad5b0dd597086791" ON "Prescription" ("appointmentId") `);
        await queryRunner.query(`CREATE INDEX "IDX_22ab3512862f598ed88198e566" ON "Prescription" ("doctorId") `);
        await queryRunner.query(`CREATE TABLE "ShiftSchedule" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "doctorId" uuid NOT NULL, "startTime" date NOT NULL, "endTime" date NOT NULL, "day" character varying NOT NULL, CONSTRAINT "PK_f42cf5482d042c0b8cf65645055" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3357279c598dadaa5c7b54954a" ON "ShiftSchedule" ("doctorId") `);
        await queryRunner.query(`CREATE TABLE "Doctor" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "specialization" character varying(100) NOT NULL, "departmentId" uuid NOT NULL, CONSTRAINT "REL_ae6dbc8dba9c697c34a1c14b8f" UNIQUE ("userId"), CONSTRAINT "PK_e51d7afee336c51f147089232fb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ae6dbc8dba9c697c34a1c14b8f" ON "Doctor" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c7ddb221d8ff949dd570031a59" ON "Doctor" ("departmentId") `);
        await queryRunner.query(`CREATE TYPE "public"."Appointment_status_enum" AS ENUM('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED')`);
        await queryRunner.query(`CREATE TABLE "Appointment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "doctorId" uuid NOT NULL, "patientId" uuid NOT NULL, "status" "public"."Appointment_status_enum" NOT NULL, "notes" character varying(500) NOT NULL, CONSTRAINT "PK_b4c282a5c7803f8bd875bc6c4d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f86425360509a0ead679c17b3e" ON "Appointment" ("doctorId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ceca0c75fde8f7ec420063d147" ON "Appointment" ("patientId") `);
        await queryRunner.query(`CREATE TABLE "Bill" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "patientId" uuid NOT NULL, "appointmentId" uuid NOT NULL, "amount" numeric(10,2) NOT NULL, "status" character varying NOT NULL, "issueDate" date NOT NULL, CONSTRAINT "PK_de515b5d080f8874e806726be49" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7899137a28dbfe4e966f86ffaa" ON "Bill" ("patientId") `);
        await queryRunner.query(`CREATE INDEX "IDX_44b8ed9b1a4b8484fb4d760d8c" ON "Bill" ("appointmentId") `);
        await queryRunner.query(`CREATE TABLE "Ward" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "capacity" numeric NOT NULL, CONSTRAINT "PK_d46fc254134e25d8b60ff9eeb7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "RoomAssign" ("id" SERIAL NOT NULL, "patientId" uuid NOT NULL, "wardId" uuid NOT NULL, "checkIn" date NOT NULL, "checkOut" date, CONSTRAINT "PK_a56e880fe8b37b11d858f053ccb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3a0492d7ab030db3e8fe8c82aa" ON "RoomAssign" ("patientId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a31910ddcc21f166595e83ba1d" ON "RoomAssign" ("wardId") `);
        await queryRunner.query(`CREATE TYPE "public"."Patient_gender_enum" AS ENUM('MALE', 'FEMALE', 'OTHER')`);
        await queryRunner.query(`CREATE TABLE "Patient" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "dob" date NOT NULL, "gender" "public"."Patient_gender_enum" NOT NULL, "insuranceInfo" character varying, CONSTRAINT "REL_fd38098a3964235e38f0223d2a" UNIQUE ("userId"), CONSTRAINT "PK_c4f8df6be1b44e92e9d29b7e7f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fd38098a3964235e38f0223d2a" ON "Patient" ("userId") `);
        await queryRunner.query(`CREATE TYPE "public"."User_role_enum" AS ENUM('DOCTOR', 'ADMIN', 'RECEPTIONIST', 'PATIENT')`);
        await queryRunner.query(`CREATE TABLE "User" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "email" character varying(200) NOT NULL, "role" "public"."User_role_enum" NOT NULL, "password" character varying(200) NOT NULL, "phone" character varying(15) NOT NULL, CONSTRAINT "UQ_4a257d2c9837248d70640b3e36e" UNIQUE ("email"), CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Receptionist" ADD CONSTRAINT "FK_842e8fe87432f39db96c61915f2" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Receptionist" ADD CONSTRAINT "FK_da37d3c191c57c082e8769b7025" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Prescription" ADD CONSTRAINT "FK_22ab3512862f598ed88198e5669" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ShiftSchedule" ADD CONSTRAINT "FK_3357279c598dadaa5c7b54954a7" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Doctor" ADD CONSTRAINT "FK_ae6dbc8dba9c697c34a1c14b8f5" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Doctor" ADD CONSTRAINT "FK_c7ddb221d8ff949dd570031a594" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Appointment" ADD CONSTRAINT "FK_f86425360509a0ead679c17b3eb" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Appointment" ADD CONSTRAINT "FK_ceca0c75fde8f7ec420063d1475" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Bill" ADD CONSTRAINT "FK_7899137a28dbfe4e966f86ffaa9" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Bill" ADD CONSTRAINT "FK_44b8ed9b1a4b8484fb4d760d8c4" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "RoomAssign" ADD CONSTRAINT "FK_3a0492d7ab030db3e8fe8c82aa5" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "RoomAssign" ADD CONSTRAINT "FK_a31910ddcc21f166595e83ba1d0" FOREIGN KEY ("wardId") REFERENCES "Ward"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Patient" ADD CONSTRAINT "FK_fd38098a3964235e38f0223d2aa" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Patient" DROP CONSTRAINT "FK_fd38098a3964235e38f0223d2aa"`);
        await queryRunner.query(`ALTER TABLE "RoomAssign" DROP CONSTRAINT "FK_a31910ddcc21f166595e83ba1d0"`);
        await queryRunner.query(`ALTER TABLE "RoomAssign" DROP CONSTRAINT "FK_3a0492d7ab030db3e8fe8c82aa5"`);
        await queryRunner.query(`ALTER TABLE "Bill" DROP CONSTRAINT "FK_44b8ed9b1a4b8484fb4d760d8c4"`);
        await queryRunner.query(`ALTER TABLE "Bill" DROP CONSTRAINT "FK_7899137a28dbfe4e966f86ffaa9"`);
        await queryRunner.query(`ALTER TABLE "Appointment" DROP CONSTRAINT "FK_ceca0c75fde8f7ec420063d1475"`);
        await queryRunner.query(`ALTER TABLE "Appointment" DROP CONSTRAINT "FK_f86425360509a0ead679c17b3eb"`);
        await queryRunner.query(`ALTER TABLE "Doctor" DROP CONSTRAINT "FK_c7ddb221d8ff949dd570031a594"`);
        await queryRunner.query(`ALTER TABLE "Doctor" DROP CONSTRAINT "FK_ae6dbc8dba9c697c34a1c14b8f5"`);
        await queryRunner.query(`ALTER TABLE "ShiftSchedule" DROP CONSTRAINT "FK_3357279c598dadaa5c7b54954a7"`);
        await queryRunner.query(`ALTER TABLE "Prescription" DROP CONSTRAINT "FK_22ab3512862f598ed88198e5669"`);
        await queryRunner.query(`ALTER TABLE "Receptionist" DROP CONSTRAINT "FK_da37d3c191c57c082e8769b7025"`);
        await queryRunner.query(`ALTER TABLE "Receptionist" DROP CONSTRAINT "FK_842e8fe87432f39db96c61915f2"`);
        await queryRunner.query(`DROP TABLE "User"`);
        await queryRunner.query(`DROP TYPE "public"."User_role_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fd38098a3964235e38f0223d2a"`);
        await queryRunner.query(`DROP TABLE "Patient"`);
        await queryRunner.query(`DROP TYPE "public"."Patient_gender_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a31910ddcc21f166595e83ba1d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3a0492d7ab030db3e8fe8c82aa"`);
        await queryRunner.query(`DROP TABLE "RoomAssign"`);
        await queryRunner.query(`DROP TABLE "Ward"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_44b8ed9b1a4b8484fb4d760d8c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7899137a28dbfe4e966f86ffaa"`);
        await queryRunner.query(`DROP TABLE "Bill"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ceca0c75fde8f7ec420063d147"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f86425360509a0ead679c17b3e"`);
        await queryRunner.query(`DROP TABLE "Appointment"`);
        await queryRunner.query(`DROP TYPE "public"."Appointment_status_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c7ddb221d8ff949dd570031a59"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ae6dbc8dba9c697c34a1c14b8f"`);
        await queryRunner.query(`DROP TABLE "Doctor"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3357279c598dadaa5c7b54954a"`);
        await queryRunner.query(`DROP TABLE "ShiftSchedule"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_22ab3512862f598ed88198e566"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5016c615f5ad5b0dd597086791"`);
        await queryRunner.query(`DROP TABLE "Prescription"`);
        await queryRunner.query(`DROP TABLE "Department"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_da37d3c191c57c082e8769b702"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_842e8fe87432f39db96c61915f"`);
        await queryRunner.query(`DROP TABLE "Receptionist"`);
    }

}
