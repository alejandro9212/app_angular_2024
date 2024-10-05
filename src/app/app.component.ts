import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppCarroComponent } from './components/app-carro/app-carro.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppCarroComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularCarrito';
}
