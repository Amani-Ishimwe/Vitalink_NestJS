import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1757580120211 implements MigrationInterface {
    name = ' $npmConfigName1757580120211'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."appointment_status_enum" AS ENUM('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED')`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "status" "public"."appointment_status_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."appointment_status_enum"`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD "status" character varying NOT NULL`);
    }

}
