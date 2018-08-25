import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { PhotoService } from '../../photo/photo.service';
import { PhotoComment } from '../../photo/photo-comment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlatformDetectorService } from '../../../core/platform-detector/platform-detector.service';

@Component({
    selector: 'app-photo-comments',
    templateUrl: './photo-comments.component.html'
})
export class PhotoCommentsComponent implements OnInit {

    @Input() photoId: number;

    @ViewChild('commentInput') commentInput: ElementRef<HTMLInputElement>;

    comments$: Observable<PhotoComment[]>;
    commentForm: FormGroup;

    constructor(
        private photoService: PhotoService,
        private platformDetectorService: PlatformDetectorService,
        private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.comments$ = this.photoService.getComments(this.photoId);
        this.commentForm = this.formBuilder.group({
            comment: ['',
               [ Validators.required,
                Validators.maxLength(300)]
            ]
        });
        // tslint:disable-next-line:no-unused-expression
        // this.platformDetectorService.isPlatformBrowser() &&
        //     this.commentInput.nativeElement.focus();

    }
}
