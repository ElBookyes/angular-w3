import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NoteFormComponent } from './components/note-form/note-form.component';
import { NoteSectionComponent } from './components/note-section/note-section.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, 
             NoteFormComponent, 
             NoteSectionComponent,
            ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'angular-w3';
}
