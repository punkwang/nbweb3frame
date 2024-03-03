import {Controller, Get} from "@nestjs/common";
import {MainIndexAction} from "../actions";
import {Action} from "../../common/base";

@Controller('main')
export class MainController {

    @Get('/')
    @Action(MainIndexAction)
    index() {

    }
}