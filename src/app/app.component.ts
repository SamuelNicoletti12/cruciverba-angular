import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CrosswordComponent } from "./crossword/crossword.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CrosswordComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cruciverba-angular';
}
