import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailValidator } from '../../common/email.validator';
import { IdentityService } from '../../services/http/identity/identity.service';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  providers:[IdentityService]
})
export class RegisterComponent {

  private model: any = {};
  public form: FormGroup = new FormGroup({});
  public givenName: FormControl;
  public familyName: FormControl;
  public email: FormControl;
  public password: FormControl;
  public repeatpassword: FormControl;

  public submitted:boolean = false;

  private errorMessages: string[] = [];
  private errorMessage: string = '';

  constructor(
    fb: FormBuilder,
    public router: Router,
    private identityService: IdentityService) {
    
    this.form.addControl('givenName', new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])));
    this.form.addControl('familyName', new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])));
    this.form.addControl('email', new FormControl('', Validators.compose([Validators.required, EmailValidator.validate])));
    this.form.addControl('password', new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)])));
    this.form.addControl('repeatpassword', new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)])));

    this.givenName = this.form.controls['givenName'] as FormControl;
    this.familyName = this.form.controls['familyName'] as FormControl;
    this.email = this.form.controls['email'] as FormControl;
    this.password = this.form.controls['password'] as FormControl;
    this.repeatpassword =  this.form.controls['repeatpassword'] as FormControl;

   }


  public addAccount():void {
    this.submitted = true;
    if (this.form.valid) {
      this.model.givenName = this.givenName.value;
      this.model.familyName = this.familyName.value;
      this.model.username = this.email.value;
      this.model.password = this.password.value;
      this.model.roles = 'user';
      this.signup();
    }
  }

  signup(): void {

    this.identityService.Create(this.model)
        .subscribe(
        (res: any) => {
            // IdentityResult.
            if (res.succeeded) {
                // Signs in the user.
                //this.signin();
                this.router.navigate(['/admin']);
            } else {
                this.errorMessages = res.errors;
            }

        },
        (error: any) => {

            // Error on post request.
            let errMsg = (error.message) ? error.message :
                error.status ? `${error.status} - ${error.statusText}` : 'Server error';

            console.log(errMsg);

            this.errorMessage = "Server error. Try later.";

        });

}

}
