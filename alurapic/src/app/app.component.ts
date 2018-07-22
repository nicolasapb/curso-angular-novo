import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  photos = [
    {
      url: 'https://goo.gl/Pn3fzq',
      description: 'Leão'
    },
    {
      url: 'https://goo.gl/JPGe5Q',
      description: 'Leoa'
    }
  ];
}
