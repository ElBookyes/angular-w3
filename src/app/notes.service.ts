import { Injectable } from '@angular/core';
import { Note } from './noteInterface';


@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor() {
    const data = localStorage.getItem('notes');
    if (data) {
      this.notes = JSON.parse(data);
    }
  }
  
  notes: Note[] = [];

  addNote(note: Note) {
    this.notes.push(note);
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  clearNotes() {
    this.notes = [];
    localStorage.removeItem('notes');
  }

  getNotes() {
    return this.notes;
  }

}
