import { Injectable } from '@angular/core';
import { Note } from './noteInterface';


@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private notes: Note[] = [];
  editMode: boolean = false;

  constructor() {
    const data = localStorage.getItem('notes');
    if (data) {
      this.notes = JSON.parse(data);
    }
  }
  
  addNote(note: Note): void {
    this.notes.unshift(note);
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  clearNotes(): void {
    this.notes = [];
    localStorage.removeItem('notes');
  }

  getNotes(): Note[] {
    return this.notes;
  }

  searchNotes(searchValue: string): Note[] {
    return this.notes.filter(note => {
      return note.title.toLowerCase().includes(searchValue.toLowerCase()) || note.content.toLowerCase().includes(searchValue.toLowerCase());
    });
  }

  getTotalNotes(): number {
    return this.notes.length;
  }

  updateNote(index: number, note: Note): void {
    this.notes[index] = note;
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  deleteNote(index: number): void {
    this.notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }
}
