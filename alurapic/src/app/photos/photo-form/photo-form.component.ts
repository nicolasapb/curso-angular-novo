import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlatformDetectorService } from '../../core/platform-detector/platform-detector.service';

@Component({
  templateUrl: './photo-form.component.html'
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  file: File;

  @ViewChild('descriptionInput') descriptionInput: ElementRef<HTMLInputElement>;

  constructor(private formBuilder: FormBuilder,
    private platformDetectorService: PlatformDetectorService) { }

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
    console.log(description);
    console.log(allowComments);
    console.log(this.file);
  }

}
