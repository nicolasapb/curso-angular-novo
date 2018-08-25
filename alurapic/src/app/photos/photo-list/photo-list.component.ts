import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos: Photo[] = [];
  filter = '';
  hasMore = true;
  currentPage = 1;
  userName = '';

  constructor(private activtedRoute: ActivatedRoute, private photoService: PhotoService) {}

  ngOnInit(): void {
    // this.userName = this.activtedRoute.snapshot.params.userName;
    this.activtedRoute.params.subscribe(params => {
      this.userName = params.userName;
      this.photos = this.activtedRoute.snapshot.data['photos'];
    });
  }

  load() {
    this.photoService
      .listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe(photos => {
        this.filter = '';
        this.photos = this.photos.concat(photos);
         (!photos.length) ? this.hasMore = false : this.hasMore = true ;
      });
  }
}
