import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { PhotoService } from '../../photo/photo.service';
import { PhotoComment } from '../../photo/photo-comment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-photo-comments',
    templateUrl: './photo-comments.component.html'
})
export class PhotoCommentsComponent implements OnInit {

    @Input() photoId: number;

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
        console.log(comment);
        this.photoService
            .addComment(this.photoId, comment)
            .subscribe(
                () => {
                    this.commentForm.reset();
                    alert('comment added');
                });
    }
}
