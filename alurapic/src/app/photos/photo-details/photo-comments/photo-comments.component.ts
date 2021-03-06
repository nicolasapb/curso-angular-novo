import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';

import { PhotoService } from '../../photo/photo.service';
import { PhotoComment } from '../../photo/photo-comment';
import { Photo } from '../../photo/photo';

@Component({
    selector: 'app-photo-comments',
    templateUrl: './photo-comments.component.html',
    styleUrls: ['./photo-comments.component.css']
})
export class PhotoCommentsComponent implements OnInit {

    @Input() photoId: number;
    @Input() photo: Photo;

    comments$: Observable<PhotoComment[]>;
    commentForm: FormGroup;

    constructor(
        private photoService: PhotoService,
        private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.comments$ = this.photoService.getComments(this.photoId);
        this.commentForm = this.formBuilder.group({
            comment: ['',
               [ Validators.required,
                Validators.maxLength(300)]
            ]
        });
    }

    save() {
        const comment = this.commentForm.get('comment').value as string;
        this.comments$ = this.photoService
                            .addComment(this.photoId, comment)
                            .pipe(switchMap(() => this.photoService.getComments(this.photoId)))
                            .pipe(tap(() => {
                                this.commentForm.reset();
                            }));
    }
}
