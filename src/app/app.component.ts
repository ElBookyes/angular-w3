import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NoteFormComponent } from './note-form/note-form.component';
import { NoteSectionComponent } from './note-section/note-section.component';
import { MatPaginatorModule } from '@angular/material/paginator';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, 
             NoteFormComponent, 
             NoteSectionComponent, 
             MatPaginatorModule,
             ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'angular-w3';
}
