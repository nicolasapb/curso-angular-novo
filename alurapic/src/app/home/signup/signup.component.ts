import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { lowerCaseValidator } from '../../shared/validators/lower-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './new-user';
import { SignUpService } from './signup.service';
import { Router } from '@angular/router';
import { PlatformDetectorService } from '../../core/platform-detector/platform-detector.service';
import { AlertService } from '../../shared/components/alert/alert.service';
import { userNamePassword } from './username-password.validator';

@Component({
  templateUrl: './signup.component.html',
  providers: [ UserNotTakenValidatorService ]
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private userNotTakenValidatorService: UserNotTakenValidatorService,
    private signupService: SignUpService,
    private router: Router,
    private platformDetectorService: PlatformDetectorService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      fullName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(40)
      ]],
      userName: ['', [
          Validators.required,
          lowerCaseValidator,
          Validators.minLength(2),
          Validators.maxLength(10)
        ],
        this.userNotTakenValidatorService.chcekUserNameTaken()
      ],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(14),
      ]]
    }, {
      validator: userNamePassword
    });
    // tslint:disable-next-line:no-unused-expression
    this.platformDetectorService.isPlatformBrowser() &&
        this.emailInput.nativeElement.focus();
  }

  signup() {

    if (this.signupForm.valid && !this.signupForm.pending) {
      const newUser = this.signupForm.getRawValue() as NewUser;
      this.signupService
          .signup(newUser)
          .subscribe(
            () => {
              this.alertService.success('new user created with succes', true);
              this.router.navigate(['']);
              // alert('new user created with success');
            },
            err => {
              console.log('erro', err);
              this.signupForm.reset();
              // tslint:disable-next-line:no-unused-expression
              this.platformDetectorService.isPlatformBrowser() &&
                  this.emailInput.nativeElement.focus();
              // alert('Something went wrong ):');
              this.alertService.danger('Something went wrong ):');
            });
    }
  }

}
