import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { lowerCaseValidator } from '../../shared/validators/lower-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './new-user';
import { SignUpService } from './signup.service';
import { Router } from '@angular/router';
import { PlatformDetectorService } from '../../core/platform-detector/platform-detector.service';

@Component({
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private userNotTakenValidatorService: UserNotTakenValidatorService,
    private signupService: SignUpService,
    private router: Router,
    private platformDetectorService: PlatformDetectorService) { }

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
    });
    // tslint:disable-next-line:no-unused-expression
    this.platformDetectorService.isPlatformBrowser() &&
        this.emailInput.nativeElement.focus();
  }

  signup() {
    const newUser = this.signupForm.getRawValue() as NewUser;
    this.signupService
        .signup(newUser)
        .subscribe(
          () => {
            this.router.navigate(['']);
            alert('new user created with success');
          },
          err => {
            console.log('erro', err);
            this.signupForm.reset();
            // tslint:disable-next-line:no-unused-expression
            this.platformDetectorService.isPlatformBrowser() &&
                this.emailInput.nativeElement.focus();
            alert('Something went wrong ):');
          });
  }

}
