import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {}
}
