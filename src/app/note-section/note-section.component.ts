import { Component } from '@angular/core';
import { NotesService } from '../notes.service';
import { Note } from '../noteInterface';

@Component({
  selector: 'app-note-section',
  standalone: true,
  imports: [],
  templateUrl: './note-section.component.html',
  styleUrl: './note-section.component.scss'
})
export class NoteSectionComponent {
  
  notes: Note[] = [];

  constructor(private notesService: NotesService) {
    this.notes = this.notesService.getNotes();
  }
}
