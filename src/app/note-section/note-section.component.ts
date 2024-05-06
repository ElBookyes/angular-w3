import { Component, OnInit, ViewChild } from '@angular/core';
import { NotesService } from '../notes.service';
import { Note } from '../noteInterface';
import { NoteFormComponent } from '../note-form/note-form.component';
import { MatPaginatorModule } from '@angular/material/paginator';


@Component({
  selector: 'app-note-section',
  standalone: true,
  imports: [NoteFormComponent, MatPaginatorModule],
  templateUrl: './note-section.component.html',
  styleUrl: './note-section.component.scss'
})
export class NoteSectionComponent implements OnInit{

  @ViewChild(NoteFormComponent) noteFormComponent!: NoteFormComponent;

  formToggle: boolean = false;
  selectedNoteIndex: number = -1;
  notes: Note[] = [];

  constructor(private notesService: NotesService) {}

  ngOnInit() {
    this.loadNotes();
  }

  loadNotes = (): void => {
    this.notes = this.notesService.getNotes();
  }

  toggleForm = (): void => {
    this.formToggle = !this.formToggle;
  }

  onSelected = (index: number): void => {
    this.selectedNoteIndex = index;
    const selectedNote = this.notes[index];
    this.noteFormComponent.onSelected(selectedNote, index);
  }

  onEditPressed = (index: number): void => {
    this.selectedNoteIndex = index;
    this.toggleForm();
  }

  onDeletePressed = (index: number): void => {
    this.notesService.deleteNote(index);
    this.loadNotes();
  }
}
