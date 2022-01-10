import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from '../service/toast.service';

@Injectable({ providedIn: 'root' })
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private toastService: ToastService) {}

    // issue from 2017, still not resolved https://github.com/angular/angular/issues/19148
    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next
            .handle(req)
            .pipe(catchError((err) => (this.isBlobError(err) ? this.parseErrorBlob(err) : this.handleError(err))));
    }

    handleError(error: HttpErrorResponse): Observable<never> {
        let msg = error.error.message ?? error.error.error?.message;
        if (!msg) {
            msg = 'Unknown error. Check file size and integrity.';
        }
        this.toastService.open(msg, 'error');
        return throwError(error);
    }

    isBlobError(err: unknown): boolean {
        return err instanceof HttpErrorResponse && err.error instanceof Blob && err.error.type === 'application/json';
    }

    parseErrorBlob(err: HttpErrorResponse): Observable<never> {
        const reader: FileReader = new FileReader();
        const obs = new Observable<never>((observer) => {
            reader.onloadend = (_) => {
                const newError = new HttpErrorResponse({
                    ...err,
                    error: JSON.parse(reader.result as string),
                } as any);
                this.handleError(newError);
                observer.error(newError);
                observer.complete();
            };
        });
        reader.readAsText(err.error);
        return obs;
    }
}
