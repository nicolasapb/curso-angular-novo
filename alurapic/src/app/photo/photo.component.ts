import { Component } from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ap-photo',
    templateUrl: './photo.component.html'
})
export class PhotoComponent {
    description = 'Leão';
    url = 'https://goo.gl/Pn3fzq';
}
