import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppData } from '../../app-data';
import { EmailValidator } from '../../common/email.validator';
import { AuthenticationService } from '../../services/authentication.service';
import { IdentityService } from '../../services/http/identity/identity.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: 'reset-password.component.html',
  providers:[IdentityService]
})
export class ResetPasswordComponent {

  private model: any = {};
  public form: FormGroup = new FormGroup({});
  //public oldpassword: FormControl;
  public password: FormControl;
  public repeatpassword: FormControl;

  public submitted:boolean = false;

  private errorMessages: string[] = [];
  private errorMessage: string = '';

  public userName: string = '';

  constructor(
    fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    public authenticationService: AuthenticationService,
    private identityService: IdentityService) {

        this.authenticationService.isSignedIn()
        .subscribe((data) => {
          AppData.UserIsSignedIn = data;

          if (!AppData.UserIsSignedIn) {
            this.router.navigate(['/login']);
          }

          this.route.params.subscribe((params: Params) => {
            this.userName = params['userName'];
            });
    
            //this.form.addControl('oldpassword', new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)])));
            this.form.addControl('password', new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)])));
            this.form.addControl('repeatpassword', new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)])));

            //this.oldpassword = this.form.controls['oldpassword'] as FormControl;
            this.password = this.form.controls['password'] as FormControl;
            this.repeatpassword =  this.form.controls['repeatpassword'] as FormControl;
        });
   }


   public onChangePassword():void {
    this.submitted = true;
    if (this.form.valid) {
        this.model.userId = AppData.UserId;
        this.model.userName = this.userName;
        this.model.password = this.password.value;
        this.changePassword();
    }
}

changePassword(): void {

    this.identityService.ResetPassword(this.model)
        .subscribe(
        (res: any) => {
            // IdentityResult.
            if (res.succeeded) {
                // Signs in the user.
                this.router.navigate(['/admin']);
            } else {
                this.errorMessages = res.errors;
            }

        },
        (error: any) => {

            // Error on post request.
            let errMsg = (error.message) ? error.message :
                error.status ? `${error.status} - ${error.statusText}` : 'Server error';

            this.errorMessage = "Server error. Try later.";

        });

}

}
