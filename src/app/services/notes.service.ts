import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Note } from '../models/noteInterface';


@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private noteSubject: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>([]);
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
    this.noteSubject.next(this.notes);
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  clearNotes(): void {
    this.notes = [];
    localStorage.removeItem('notes');
  }

  getNoteSubject(): Observable<Note[]> {
    return this.noteSubject.asObservable();
  }

  getNotes(): Note[] {
    return this.notes;
  }

  getPaginatedData(page: number, itemsPerPage: number): Note[] {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return this.notes.slice(startIndex, endIndex);
  }

  getTotalNotes(): number {
    return this.notes.length;
  }

  updateNote(index: number, note: Note): void {
    this.notes[index] = note;
    this.noteSubject.next(this.notes);
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  deleteNote(index: number): void {
    this.notes.splice(index, 1);
    this.noteSubject.next(this.notes);
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }
}
