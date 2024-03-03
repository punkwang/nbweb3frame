import {Injectable} from "@nestjs/common";
import {TestService} from "../../../common/services";
import {IAction} from "../../../common/base";

@Injectable()
export class MainIndexAction implements IAction {
    constructor(
        protected testService: TestService
    ) {
    }

    async handle(...args: any[]): Promise<any> {
        return this.testService.test();
    }
}