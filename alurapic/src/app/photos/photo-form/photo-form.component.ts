import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlatformDetectorService } from '../../core/platform-detector/platform-detector.service';

@Component({
  templateUrl: './photo-form.component.html'
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
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

}
