import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1708700361475 implements MigrationInterface {
    name = 'Test1708700361475'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service" ADD "migrationTest" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "migrationTest"`);
    }

}
