import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateProducts1622458642003 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'products',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'image',
                    type: 'varchar',
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'price',
                    type: 'numeric',
                    scale: 2,
                    precision: 10,
                },
                {
                  name: 'available',
                  type: 'boolean',
                },
                {
                  name: 'favorite',
                  type: 'boolean',
                },
                {
                  name: 'quantity',
                  type: 'integer',
              },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('products');
    }

}
