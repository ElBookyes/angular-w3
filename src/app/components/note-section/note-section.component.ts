import { Component, OnInit, ViewChild, ElementRef, HostListener, OnChanges, SimpleChanges, inject } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/noteInterface';
import { NoteFormComponent } from '../note-form/note-form.component';
import { FormsModule } from '@angular/forms';
import { fadeInOut } from '../../animations/animations';
import { NoteComponent } from '../note/note.component';
import { PaginationComponent } from '../pagination/pagination.component';


@Component({
  selector: 'app-note-section',
  standalone: true,
  imports: [NoteFormComponent, FormsModule, NoteComponent, PaginationComponent],
  templateUrl: './note-section.component.html', 
  styleUrl: './note-section.component.scss',
  animations: [fadeInOut],
})


export class NoteSectionComponent implements OnInit {

  @ViewChild(NoteFormComponent) noteFormComponent!: NoteFormComponent;
  @ViewChild("noteSection") noteSection!: ElementRef<HTMLElement>;
  searchValue: string = '';
  formToggle: boolean = false;
  selectedNoteIndex: number = -1;
  notes: Note[] = [];
  filteredNotes: Note[] = [];
  
  // pagination
  paginatedNotes: Note[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalItems = 0;
  totalPages: number = 0;

  private notesService: NotesService = inject(NotesService);

  ngOnInit(): void {
    this.notesService.getNoteSubject().subscribe(notes => {
      this.notes = this.notesService.getNotes();
      this.loadNotes();
      this.totalItems = this.notesService.getTotalNotes();
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.updateFilteredNotes();
    });
  }

  loadNotes(): void {
    this.paginatedNotes = this.notesService.getPaginatedData(this.currentPage, this.itemsPerPage);
    this.totalItems = this.notesService.getTotalNotes();
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

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadNotes();
  }

  updateFilteredNotes(): void {
    this.filteredNotes = this.notes;
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
