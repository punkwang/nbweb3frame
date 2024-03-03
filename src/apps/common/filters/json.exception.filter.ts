import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from "@nestjs/common";

@Catch(HttpException)
export class JsonExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): any {
        const response = host.switchToHttp().getResponse();
        const status = exception.getStatus();
        response.send({
            ret: null,
            error: status,
            msg: exception.message,
        })
    }
}