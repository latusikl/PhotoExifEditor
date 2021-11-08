import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MsgType } from '../model/msgType';

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    constructor(private toastr: ToastrService) {}

    open(message: string, snackBarMsgType: MsgType): void {
        if (snackBarMsgType === 'error') {
            this.toastr.error(message);
        } else {
            this.toastr.success(message);
        }
    }
}
