import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PhotoService } from '../../photo/photo.service';
import { PhotoComment } from '../../photo/photo-comment';

@Component({
    selector: 'app-photo-comments',
    templateUrl: './photo-comments.component.html'
})
export class PhotoCommentsComponent implements OnInit {

    @Input() photoId: number;
    comments$: Observable<PhotoComment[]>;

    constructor(
        private photoService: PhotoService) { }

    ngOnInit(): void {
        this.comments$ = this.photoService.getComments(this.photoId);
    }
}
