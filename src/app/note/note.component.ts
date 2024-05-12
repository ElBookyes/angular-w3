import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NoteSectionComponent } from '../note-section/note-section.component';
import { fadeInOut } from '../animations';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [NoteSectionComponent],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
  animations: [fadeInOut]
})
export class NoteComponent {
  @Input() public title: string = '';
  @Input() public content: string = '';
  @Input() public index: number = -1;
  @Input() public selectedNoteIndex: number = -1;
  @Output() public onSelectedNote: EventEmitter<number> = new EventEmitter<number>();
  @Output() public onEditNote: EventEmitter<number> = new EventEmitter<number>();
  @Output() public onDeleteNote: EventEmitter<number> = new EventEmitter<number>();

  constructor(private NoteSectionComponent: NoteSectionComponent) { }

  processSelectedNote = (index: number): void => {
    this.onSelectedNote.emit(index);
  }

  processEditPressed = (index: number): void => {
    this.onEditNote.emit(index);
  }

  processDeletePressed = (index: number): void => { 
    this.onDeleteNote.emit(index);
  }
}
