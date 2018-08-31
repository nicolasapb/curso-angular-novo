import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PlatformDetectorService } from '../../core/platform-detector/platform-detector.service';
import { AlertService } from '../../shared/components/alert/alert.service';

@Component({
    templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {

    fromUrl: string;
    loginForm: FormGroup;
    loginInvalido = false;
    @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private platformDetectorService: PlatformDetectorService,
        private alertService: AlertService,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(params => this.fromUrl = params['fromUrl']);
        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });
        // tslint:disable-next-line:no-unused-expression
        this.platformDetectorService.isPlatformBrowser() &&
            this.userNameInput.nativeElement.focus();
    }

    login() {
        const userName = this.loginForm.get('userName').value;
        const password = this.loginForm.get('password').value;

        this.authService
            .authenticate(userName, password)
            .subscribe(
                () => {
                    this.loginInvalido = false;
                    this.alertService.success('Welome ' + userName + '!', true);
                    this.fromUrl
                        ? this.router.navigateByUrl(this.fromUrl)
                        : this.router.navigate(['user', userName]);
                },
                err => {
                    console.log(err);
                    this.loginForm.reset();
                    // tslint:disable-next-line:no-unused-expression
                    this.platformDetectorService.isPlatformBrowser() &&
                        this.userNameInput.nativeElement.focus();
                    // alert('Invalid user name or password!');
                    this.alertService.danger('Invalid user name or password!');
                    this.loginInvalido = true;
            });
    }
}
