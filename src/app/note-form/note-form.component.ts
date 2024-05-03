import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { NotesService } from '../notes.service';
import { Note } from '../noteInterface';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.scss'
})
export class NoteFormComponent {
  noteForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    content: new FormControl('', [Validators.required, Validators.minLength(7)]),
  });

  constructor(private notesService: NotesService) {}

  onSubmit(): void {
    if (!this.noteForm.valid) return;

    const note: Note = {
      title: this.noteForm.value.title!,
      content: this.noteForm.value.content!,
    };

    this.notesService.addNote(note);
    console.log(this.notesService.getNotes());
    this.noteForm.reset();
  }

  isTitleInvalid() {
    return this.noteForm.controls.title.invalid && this.noteForm.controls.title.touched;
  }

  isContentInvalid() {
    return this.noteForm.controls.content.invalid && this.noteForm.controls.content.touched;
  }

}
