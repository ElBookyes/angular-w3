import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import { Note } from '../noteInterface';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.scss'
})
export class NoteFormComponent implements OnInit {
  @Input() callback: () => void = () => {};

  noteForm!: FormGroup;
  editMode: boolean = false;
  noteIndex: number = -1;

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.noteForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(5)]),
      content: new FormControl('', [Validators.required, Validators.minLength(7)]),
    });
  }

  callFormToggle() {
    this.callback();
  }

  onSubmit(): void {
    if (!this.noteForm.valid) return;
    if (this.editMode) {
      this.notesService.updateNote(this.noteIndex, this.noteForm.value);
      this.editMode = false;
      this.noteIndex = -1;
    }

    const note: Note = {
      title: this.noteForm.value.title!,
      content: this.noteForm.value.content!,
    };

    this.notesService.addNote(note);
    this.noteForm.reset();
  }

  onSelected(note: Note, index: number): void {
    this.noteForm.patchValue({ 
      title: note.title,
      content: note.content,
    });

    this.editMode = true;
    this.noteIndex = index;
  }

  isTitleInvalid() {
    return this.noteForm.controls['title'].invalid && this.noteForm.controls['title'].touched;
  }

  isContentInvalid() {
    return this.noteForm.controls['content'].invalid && this.noteForm.controls['content'].touched;
  }
}
