import { Injectable } from "@angular/core";
import { Observable, of, switchMap, throwError, tap, map } from "rxjs";
import { IUser } from "../models/user.model";
import { UserService } from "./user.service";
import { Router } from "@angular/router";
import { ToastrService } from "./toastr.service";
import { CONST_LOCALSTORAGE_KEY } from "../Constant/constant";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public _authenticated: boolean = false;

    constructor(
        private _userService: UserService,
        private _router: Router,
        private _toastrService: ToastrService,
    ) { }

    login(loginForm: IUser) {
        sessionStorage.removeItem(CONST_LOCALSTORAGE_KEY.AUTHENTICATED);
        return this._userService.get('users', loginForm).pipe(
            tap((response: IUser[]) => {
                if (response.length > 0) {
                    this._router.navigateByUrl('/todo-list');
                    sessionStorage.setItem(CONST_LOCALSTORAGE_KEY.AUTHENTICATED, JSON.stringify(response))
                } else {
                    this._toastrService.showMessage('can not find user')
                }
            })
        )
    }

    checkLogin(): boolean {
        return !!sessionStorage.getItem(CONST_LOCALSTORAGE_KEY.AUTHENTICATED);
    }

    public getUserLogin(): IUser[] {
        const users = sessionStorage.getItem(CONST_LOCALSTORAGE_KEY.AUTHENTICATED);
        return users ? JSON.parse(users) : [];
    }
}