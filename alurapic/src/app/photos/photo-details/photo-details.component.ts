import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/photo';
import { Observable } from 'rxjs';
import { AlertService } from '../../shared/components/alert/alert.service';
import { UserService } from '../../core/user/user.service';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './photo-details.component.html'
})
export class PhotoDetailsComponent implements OnInit {

  photo$: Observable<Photo>;
  photoId: number;

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService,
    private titleService: Title) { }

  ngOnInit() {
    this.photoId = this.route.snapshot.params.photoId;
    this.photo$ = this.photoService.findById(this.photoId);
    this.photo$.subscribe(photo => this.titleService.setTitle(photo.description), err => {
      this.router.navigate(['not-found']);
    });
  }

  remove() {
    this.photoService
        .removePhoto(this.photoId)
        .subscribe(
          () => {
            this.alertService.success('Photo Removed!', true);
            this.router.navigate(['/user', this.userService.getUserName()], { replaceUrl: true });
          },
          err => {
            console.log(err);
            this.alertService.warning('Photo could not be removed!');
          }
        );
  }

  like(photo: Photo) {
    this.photoService
        .like(photo.id).subscribe(
          liked => {
            if (liked) {
              this.photo$ = this.photoService.findById(photo.id);
            }
          }
        );
  }
}
