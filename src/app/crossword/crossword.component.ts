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

  onInput(event: Event, r: number, c: number) {
    const input = event.target as HTMLInputElement;
    const cell = this.grid[r][c];


    if (!input.value || input.value.length !== 1) {
      input.value = input.value.charAt(0) || '';
      return;
    }


    const letter = input.value.toUpperCase();
    cell.letter = letter;
    input.value = letter;


    const next = this.getInput(r, c + 1);
    if (next) {

      requestAnimationFrame(() => {
        next.focus();
      });
    }
  }

  handleKey(event: KeyboardEvent, r: number, c: number) {
    const key = event.key;

    if (key === 'Backspace') {
      if (!this.grid[r][c].letter && c > 0) {
        requestAnimationFrame(() => {
          this.getInput(r, c - 1)?.focus();
        });
      }
      return;
    }

    if (key === 'ArrowRight') {
      this.getInput(r, c + 1)?.focus();
      return;
    }

    if (key === 'ArrowLeft') {
      this.getInput(r, c - 1)?.focus();
      return;
    }

    if (key === 'ArrowDown') {
      this.getInput(r + 1, c)?.focus();
      return;
    }

    if (key === 'ArrowUp') {
      this.getInput(r - 1, c)?.focus();
      return;
    }
  }


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


  getInput(r: number, c: number): HTMLInputElement | null {
    return document.querySelector(
      `input[data-r="${r}"][data-c="${c}"]`
    );
  }
}
