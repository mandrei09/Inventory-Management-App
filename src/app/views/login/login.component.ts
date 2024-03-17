import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConfig } from '../../config';
import { AuthenticationService } from '../../services/authentication.service';
import { IdentityService } from '../../services/http/identity/identity.service';
import { Signin } from '../../services/signin';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [IdentityService]
})
export class LoginComponent extends Signin {

  public form: FormGroup = new FormGroup({});
  public email: FormControl;
  public password: FormControl;
  public emailreset: FormControl;
  public submitted: boolean = false;
  showPasswordBtn = false;

  public errors: string | null = null;

  constructor(
    fb: FormBuilder,
    public router: Router,
    public authenticationService: AuthenticationService,
    public identityService: IdentityService
  ) {
  super(router, authenticationService);

    // this.form = fb.group({
    //   'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    //   'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    // });

    const emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';

    this.form.addControl('email', new FormControl('', Validators.required));
    this.form.addControl('password', new FormControl('', Validators.required));

    this.form.addControl('emailreset', new FormControl('', [<any>Validators.required,  <any>Validators.pattern(emailRegex)]));

    this.email = this.form.controls['email'] as FormControl;
    this.password =  this.form.controls['password'] as FormControl;

    this.emailreset =  this.form.controls['emailreset'] as FormControl;
  }

  public onSubmit(values: Object): void {
    this.submitted = true;
    if (this.form.valid || !this.showPasswordBtn) {
      this.model.username = this.email.value;
      this.model.password = this.password.value;
      this.signin();
    }
  }

  public register() {
    this.router.navigate(['/register']);
  }

  public showResetPassword () {
    this.showPasswordBtn = true;
  }

  public back() {
  this.showPasswordBtn = false;
  }

  public resetPassword(): void {

    const resetEmail = this.emailreset.value;

    if (confirm('Doriti sa resetati parola?')) {
      this.identityService.forgetPassword(resetEmail)
          .subscribe((res) => {
            // console.log(JSON.stringify(res));
              if (res) {
                alert('Notificarea a fost transmisa cu succes!!');
                this.showPasswordBtn = false;
              } else {
                alert('Userul nu exista!!');
              }
          }, (error) => {
            alert(error);
          });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.onSubmit('');
  }

  handleKeyUp(e) {
    if (e.keyCode === 13) {
       this.handleSubmit(e);
    }
  }

  public getBook(): void {
    const url = `${AppConfig.urlPrefix}documents/manual/book`;
    window.open(url);
  }
}
