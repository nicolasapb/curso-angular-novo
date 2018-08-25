import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { PhotoComponent } from './photo.component';
import { DummyComponent } from './photo-details/photo-comments/dummy/dummy.component';

@NgModule({
    declarations: [
        PhotoComponent,
        DummyComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule
    ],
    exports: [
        PhotoComponent
    ]
})
export class PhotoModule {

}
