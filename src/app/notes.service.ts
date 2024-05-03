import { Injectable } from '@angular/core';
import { Note } from './noteInterface';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor() { }

  notes: Note[] = [];

  addNote(note: Note) {
    this.notes.push(note);
  }

  getNotes() {
    return this.notes;
  }
}
