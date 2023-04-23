import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../share/services/auth.service';
import { ToastrService } from '../../share/services/toastr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('signInNgForm') loginNgForm: NgForm | undefined;
  loginForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _toastrService: ToastrService,
  ) {
    // Create the form
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    if (this._authService._authenticated) {
      this._router.navigateByUrl('/todo-list');
    }
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this._authService.login(this.loginForm.value).subscribe();
  }
}
