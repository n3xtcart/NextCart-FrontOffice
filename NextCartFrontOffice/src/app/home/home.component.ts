import { Component } from '@angular/core';
import { NavbarLatComponent } from '../navbar-lat/navbar-lat.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NavbarLatComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
