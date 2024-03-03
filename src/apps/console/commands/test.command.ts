import {Command, CommandRunner} from "nest-commander";


@Command({
    name: 'test'
})
export class TestCommand extends CommandRunner {
    async run(passedParams: string[], options?: Record<string, any>): Promise<void> {
        
    }

}