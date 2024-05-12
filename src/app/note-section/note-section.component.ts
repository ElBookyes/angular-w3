import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { NotesService } from '../notes.service';
import { Note } from '../noteInterface';
import { NoteFormComponent } from '../note-form/note-form.component';
import { FormsModule } from '@angular/forms';
import { fadeInOut } from '../animations';
import { NoteComponent } from '../note/note.component';


@Component({
  selector: 'app-note-section',
  standalone: true,
  imports: [NoteFormComponent, FormsModule, NoteComponent],
  templateUrl: './note-section.component.html',
  styleUrl: './note-section.component.scss',
  animations: [fadeInOut],
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

  loadNotes(): void {
    this.notes = this.notesService.getNotes();
    this.filteredNotes = this.notes;
  }

  searchNotes(): void {
    this.filteredNotes = this.notes.filter(note =>
      note.title.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      note.content.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }

  toggleForm = (): void => {
    this.formToggle = !this.formToggle;
  }

  onSelected(index: number): void {
    this.selectedNoteIndex = index;
    const selectedNote = this.notes[index];
    this.noteFormComponent.onSelected(selectedNote, index);
  }

  onEditPressed(index: number): void {
    this.selectedNoteIndex = index;
    this.toggleForm();
  }

  onDeletePressed(index: number): void {
    this.notesService.deleteNote(index);
    this.loadNotes();
  }

  // Unselect note when clicking outside of the note section
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.noteSection.nativeElement.contains(event.target as Node)) {
      this.selectedNoteIndex = -1;
    }
  }
}
