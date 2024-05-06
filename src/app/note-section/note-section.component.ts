import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { NotesService } from '../notes.service';
import { Note } from '../noteInterface';
import { NoteFormComponent } from '../note-form/note-form.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-note-section',
  standalone: true,
  imports: [NoteFormComponent, CommonModule, FormsModule],
  templateUrl: './note-section.component.html',
  styleUrl: './note-section.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, scale: 0.8}),
        animate('250ms', style({ opacity: 1, scale: 1 })),
      ]),
    ]),
  ],
})


export class NoteSectionComponent implements OnInit{
  @ViewChild(NoteFormComponent) noteFormComponent!: NoteFormComponent;
  @ViewChild("noteSection") noteSection!: ElementRef<HTMLElement>;

  searchValue: string = '';
  formToggle: boolean = false;
  selectedNoteIndex: number = -1;
  notes: Note[] = [];
  filteredNotes: Note[] = [];

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes = (): void => {
    this.notes = this.notesService.getNotes();
    this.filteredNotes = this.notes;
  }

  searchNotes() {
    this.filteredNotes = this.notes.filter(note =>
      note.title.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      note.content.toLowerCase().includes(this.searchValue.toLowerCase())
    );
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

  // unselect when user clicks outside of it.
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.noteSection.nativeElement.contains(event.target as Node)) {
      this.selectedNoteIndex = -1;
    }
  }
}
