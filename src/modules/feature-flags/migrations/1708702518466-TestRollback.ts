import { MigrationInterface, QueryRunner } from "typeorm";

export class TestRollback1708702518466 implements MigrationInterface {
    name = 'TestRollback1708702518466'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "migrationTest"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service" ADD "migrationTest" character varying`);
    }

}
