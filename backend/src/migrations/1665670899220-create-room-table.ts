
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateRoomTable1597518554584 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'salas',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'nome',
                    type: 'text',
                    isNullable: false,
                },
                {
                    name: 'criado_em',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('salas')
    }
}
