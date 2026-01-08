import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeTimestampToDate1767911011508 implements MigrationInterface {
    name = 'ChangeTimestampToDate1767911011508'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "timestamp"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "timestamp" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "timestamp"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "timestamp" character varying NOT NULL`);
    }

}
