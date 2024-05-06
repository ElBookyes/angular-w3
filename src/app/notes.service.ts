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
  
  private notes: Note[] = [];
  editMode: boolean = false;

  addNote(note: Note) {
    this.notes.unshift(note);
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  clearNotes() {
    this.notes = [];
    localStorage.removeItem('notes');
  }

  getNotes() {
    return this.notes;
  }

  getTotalNotes() {
    return this.notes.length;
  }

  updateNote(index: number, note: Note) {
    this.notes[index] = note;
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  deleteNote(index: number) {
    this.notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

}
