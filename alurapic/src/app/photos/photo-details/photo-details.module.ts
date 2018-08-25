import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoDetailsComponent } from './photo-details.component';
import { PhotoModule } from '../photo/photo.module';

@NgModule({
  imports: [
    CommonModule,
    PhotoModule
  ],
  exports: [
    PhotoDetailsComponent
  ],
  declarations: [
    PhotoDetailsComponent
  ]
})
export class PhotoDetailsModule { }
