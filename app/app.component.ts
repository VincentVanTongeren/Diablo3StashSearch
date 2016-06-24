import { Component } from '@angular/core';
import { ProfileLoader } from './profile.loader'

@Component({
  selector: 'my-app',
  directives: [ProfileLoader],
  templateUrl: './html/main.html'
})
export class AppComponent { 
}
