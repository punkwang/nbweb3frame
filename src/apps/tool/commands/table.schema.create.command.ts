import {Command, CommandRunner, Option} from "nest-commander";
import {TableService} from "../services";
import {Sequelize} from "sequelize-typescript";


interface TableSchemaCreateOptions {
    tableName: string,
}

@Command({
    name: 'table.schema.create',
})
export class TableSchemaCreateCommand extends CommandRunner {

    protected db: Sequelize

    constructor(
        protected tableService: TableService
    ) {
        super();
    }

    async run(passedParams: string[], options: TableSchemaCreateOptions): Promise<void> {
        console.log(123)
    }


    @Option({
        flags: '-t, --tableName <tableName>'
    })
    parseTableName(val: string) {
        return val;
    }
}