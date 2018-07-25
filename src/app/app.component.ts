import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
    title = 'app';
    value = '123456789012345678901234567890123456789012345678901234567890';
    onClick(event) {
      console.log(JSON.stringify(event.target.id) + 'clicked');
    }
    constructor() {
    }
}
