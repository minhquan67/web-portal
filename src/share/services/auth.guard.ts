import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate
{
    constructor(
        private _authService: AuthService,
        private router: Router,
    ){
    }

    canActivate(): boolean
    {
        const isAuthenticated = this._authService.checkLogin();
        if (isAuthenticated) {
            return true;
          } else {
            this.router.navigate(['/']);
            return false;
          }
    }
}