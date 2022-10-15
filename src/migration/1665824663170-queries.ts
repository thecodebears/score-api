import { MigrationInterface, QueryRunner } from "typeorm";

export class queries1665824663170 implements MigrationInterface {
    name = 'queries1665824663170'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "base_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_03e6c58047b7a4b3f6de0bfa8d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "label" character varying(256) NOT NULL, "sublabel" character varying(256) NOT NULL, "description" character varying NOT NULL, "rating" double precision NOT NULL, "category" character varying NOT NULL, "price" integer NOT NULL, "quantity" integer NOT NULL, "sold" integer NOT NULL, "status" character varying NOT NULL, "firstDelivery" date NOT NULL, "features" json NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "base_entity"`);
    }

}
