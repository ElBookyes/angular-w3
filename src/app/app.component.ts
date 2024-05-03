import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NoteFormComponent } from './note-form/note-form.component';
import { NotesService } from './notes.service';
import { NoteSectionComponent } from './note-section/note-section.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NoteFormComponent, NoteSectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-w3';
}

// Create a system for managing notes.
// There must be a form where you can
// - input the title
// - input the text
// - choose the color
// - button to clear
// - button to save

// the notes visualize immediately and sequentially in the order they were created.
// Every note can be selected by the user.
// When selected additional buttons for editing and deleting appear.
// If the user clicks on the edit button, we visualize the contents of the selected note in the form.
// When the user clicks on the save button the note is updated.
// When the user clicks on the delete button the note is deleted.
// Add validation to the form. The title must be at least 5 characters long, the text must be at least 7 characters long.
// If theres an error, visualize it in the form. The borders become red and the error message appears.


// Store notes in an array of objects.
// The object must have the following properties:
// - id, title, text, color, date
// The id must be unique and autoincremented.
// The date must be the current date and time when the note was created.

// click a plus button to create a new note
// a form appears with the fields for the note
// the user can create a note with the form
// the note is added to the array of notes
// the note is visualized in the list of notes
// the form is cleared
// the user can create multiple notes
// the notes are visualized in the order they were created
// the user can select a note
// the note is highlighted
// additional buttons appear
// the user can edit the note