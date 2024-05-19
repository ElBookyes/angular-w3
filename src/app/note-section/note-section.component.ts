import { Component, OnInit, ViewChild, ElementRef, HostListener, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { NotesService } from '../notes.service';
import { Note } from '../noteInterface';
import { NoteFormComponent } from '../note-form/note-form.component';
import { FormsModule } from '@angular/forms';
import { fadeInOut } from '../animations';
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


export class NoteSectionComponent implements OnInit, OnChanges{

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

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.notesService.getNoteSubject().subscribe(notes => {
      this.notes = this.notesService.getNotes();
      this.loadNotes();
      this.totalItems = this.notesService.getTotalNotes();
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.updateFilteredNotes();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['notes']) {
      this.loadNotes();
    }
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

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadNotes();
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadNotes();
    }
  }

  goToPage = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    const page = target.value;
    const pageNumber = parseInt(page, 10);
    if (pageNumber && pageNumber >= 1 && pageNumber <= this.totalPages && pageNumber !== this.currentPage) {
      this.currentPage = pageNumber;
      this.loadNotes();
    }
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
