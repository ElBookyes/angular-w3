import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import { Note } from '../noteInterface';
import { NoteFormComponent } from '../note-form/note-form.component';


@Component({
  selector: 'app-note-section',
  standalone: true,
  imports: [NoteFormComponent],
  templateUrl: './note-section.component.html',
  styleUrl: './note-section.component.scss'
})
export class NoteSectionComponent implements OnInit{
  notes: Note[] = [];
  formToggle: boolean = false;
  selectedNoteIndex: number = -1;

  constructor(private notesService: NotesService) {}

  ngOnInit() {
    this.notes = this.notesService.getNotes();
  }

  toggleForm = (): void => {
    this.formToggle = !this.formToggle;
  }

  onSelected = (index: number): void => {}

  onEditPressed = (index: number): void => {
    this.selectedNoteIndex = index;
    this.formToggle = true;
  }

  private resetForm = (): void => {
    this.formToggle = false;
  }
}
