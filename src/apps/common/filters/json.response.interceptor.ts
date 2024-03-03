import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';

export interface Response<T> {
    ret: T;
}

@Injectable()
export class JsonResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<Response<T>> | Promise<Observable<Response<T>>> {
        return next.handle().pipe(map(data => ({ret: data, error: false, msg: ''})));
    }

}