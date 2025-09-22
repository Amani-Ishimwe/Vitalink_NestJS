import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1758552796349 implements MigrationInterface {
    name = ' $npmConfigName1758552796349'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctor" DROP COLUMN "availableSlots"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctor" ADD "availableSlots" jsonb`);
    }

}
