import { MigrationInterface, QueryRunner } from "typeorm";

export class LessonsStudentsSessionsPaymentsModels1669943851834 implements MigrationInterface {
    name = 'LessonsStudentsSessionsPaymentsModels1669943851834'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "lesson" (
                "id" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                "startTime" TIME NOT NULL,
                "endTime" TIME NOT NULL,
                "price" integer NOT NULL,
                "active" boolean NOT NULL,
                CONSTRAINT "PK_0ef25918f0237e68696dee455bd" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "student" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "lastName" character varying NOT NULL,
                "contactNumber" character varying(30) NOT NULL,
                "bornDate" date NOT NULL,
                "studyLevel" character varying NOT NULL,
                CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "payment" (
                "id" SERIAL NOT NULL,
                "reference" character varying NOT NULL,
                "at" TIMESTAMP WITH TIME ZONE NOT NULL,
                CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "session" (
                "id" SERIAL NOT NULL,
                "date" TIMESTAMP WITH TIME ZONE NOT NULL,
                "attended" boolean NOT NULL,
                "lessonId" integer,
                "studentId" integer,
                "paymentId" integer,
                CONSTRAINT "REL_4da52a13086e753fd344435739" UNIQUE ("paymentId"),
                CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "session"
            ADD CONSTRAINT "FK_09786128e2cb5082286858209a9" FOREIGN KEY ("lessonId") REFERENCES "lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "session"
            ADD CONSTRAINT "FK_aab58f9e25cca87a369a4732bce" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "session"
            ADD CONSTRAINT "FK_4da52a13086e753fd344435739b" FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "session" DROP CONSTRAINT "FK_4da52a13086e753fd344435739b"
        `);
        await queryRunner.query(`
            ALTER TABLE "session" DROP CONSTRAINT "FK_aab58f9e25cca87a369a4732bce"
        `);
        await queryRunner.query(`
            ALTER TABLE "session" DROP CONSTRAINT "FK_09786128e2cb5082286858209a9"
        `);
        await queryRunner.query(`
            DROP TABLE "session"
        `);
        await queryRunner.query(`
            DROP TABLE "payment"
        `);
        await queryRunner.query(`
            DROP TABLE "student"
        `);
        await queryRunner.query(`
            DROP TABLE "lesson"
        `);
    }

}
