import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlatformDetectorService } from '../../core/platform-detector/platform-detector.service';
import { PhotoService } from '../photo/photo.service';
import { Router } from '@angular/router';
import { AlertService } from '../../shared/components/alert/alert.service';
import { UserService } from '../../core/user/user.service';

@Component({
  templateUrl: './photo-form.component.html'
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  file: File;
  preview: string;

  @ViewChild('descriptionInput') descriptionInput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private platformDetectorService: PlatformDetectorService,
    private photoService: PhotoService,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService) { }

  ngOnInit() {
    this.photoForm = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true]
    });

    // tslint:disable-next-line:no-unused-expression
    this.platformDetectorService.isPlatformBrowser() &&
        this.descriptionInput.nativeElement.focus();
  }

  upload() {
    const description = this.photoForm.get('description').value;
    const allowComments = this.photoForm.get('allowComments').value;
    this.photoService
      .upload(description, allowComments, this.file)
      .subscribe(
        () => {
          this.alertService.success('Photo uploaded!', true);
          this.router.navigate(['/user', this.userService.getUserName()]);
        },
        err => {
          console.log(err);
          this.photoForm.reset();
          this.alertService.warning('somenthing went wrong ):');
        }
      );
  }

  handleFile(file: File) {
    this.file = file;
    const reader = new FileReader();
    reader.onload = (event: any) => this.preview = event.target.result;
    reader.readAsDataURL(file);
  }
}
