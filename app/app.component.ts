import { Component } from '@angular/core';
import { ProfileLoader } from './profile.loader'

@Component({
  selector: 'my-app',
  directives: [ProfileLoader],
  templateUrl: '../app/html/main.html'
})
export class AppComponent { 
}
