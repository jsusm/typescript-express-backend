import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDefaultValue1670437259316 implements MigrationInterface {
    name = 'AddDefaultValue1670437259316'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "lesson"
            ALTER COLUMN "active"
            SET DEFAULT false
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "lesson"
            ALTER COLUMN "active" DROP DEFAULT
        `);
    }

}
