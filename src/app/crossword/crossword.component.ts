import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cell } from '../models/cell.models';

@Component({
  selector: 'app-crossword',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crossword.component.html',
  styleUrls: ['./crossword.component.scss']
})
export class CrosswordComponent {

  clues = [
    { question: 'Cosa disse Marianello a Riccardo riferendosi a suo nonno?', answer: 'ARDAMMELELEGNA' },
    { question: 'Cosa ha cantato Riccardo in studio?', answer: 'ILNASTROCARTATEPREGONO' },
    { question: 'Cosa ti ho lanciato cadendo dalla sedia a casa mia?', answer: 'ACQUA' },
    { question: 'Cosa è sbucato fuori dal nulla alle terme di San Casciano?', answer: 'CINGHIALE' },
    { question: 'Cosa voleva estremamente fare Antonio?', answer: 'FALO' },
    { question: 'Un pesce ricorrente?', answer: 'ZEBRAFISH' },
    { question: 'Croccante, burroso, crema e cioccolato?', answer: 'PAINSWISSE' },
    { question: 'Persone che non sopporti?', answer: 'NAPOLETANI' },
    { question: 'Il mio amico....?', answer: 'PINGUINO' },
    { question: 'è diventata parte integrante del tuo freezer?', answer: 'PASTAFROLLA' },
    { question: 'è la stessa di einstain?', answer: 'ARIA' },
    { question: 'Che soprannome ha dato Demon a Rebeka?', answer: 'BARBIEKLAUS' },
    { question: 'Quali sono gli effetti di una papera?', answer: 'TRASFORMAZIONE' }
  ];

  grid: Cell[][] = [];

  constructor() {
    this.createGrid();
  }

  createGrid() {
    this.grid = this.clues.map((clue, r) =>
      clue.answer.split('').map((letter, c) => ({
        row: r,
        col: c,
        letter: '',
        solution: letter,
        isBlocked: false,
        correct: undefined
      }))
    );
  }

  /* =========================
     SCRITTURA (PC + MOBILE)
     ========================= */
  onModelChange(r: number, c: number, value: string) {
    if (!value) return;

    const cell = this.grid[r][c];

    // prende sempre SOLO l’ultimo carattere
    cell.letter = value.slice(-1).toUpperCase();
    cell.correct = undefined;

    // ⏱️ micro-delay → evita perdita lettere su mobile
    setTimeout(() => {
      this.focusNext(r, c);
    }, 0);
  }

  /* =========================
     TASTI SPECIALI
     ========================= */
  onKeyDown(event: KeyboardEvent, r: number, c: number) {

    if (event.key === 'Backspace') {
      if (!this.grid[r][c].letter && c > 0) {
        this.focusPrev(r, c);
      }
      return;
    }

    if (event.key === 'ArrowRight') this.focusNext(r, c);
    if (event.key === 'ArrowLeft') this.focusPrev(r, c);
  }

  focusNext(r: number, c: number) {
    this.getInput(r, c + 1)?.focus();
  }

  focusPrev(r: number, c: number) {
    this.getInput(r, c - 1)?.focus();
  }

  /* =========================
     VERIFICA
     ========================= */
  checkAll() {
    this.grid.forEach(row =>
      row.forEach(cell => {
        cell.correct = cell.letter === cell.solution;
      })
    );
  }

  get allCorrect(): boolean {
    return this.grid.every(row =>
      row.every(cell => cell.correct === true)
    );
  }

  /* =========================
     DOM ACCESS
     ========================= */
  getInput(r: number, c: number): HTMLInputElement | null {
    return document.querySelector(
      `input[data-r="${r}"][data-c="${c}"]`
    );
  }
}
