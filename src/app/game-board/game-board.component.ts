import { Component, OnInit } from '@angular/core';
import { GameBoardCellComponent } from "../game-board-cell/game-board-cell.component";
import { NgForOf, NgIf } from "@angular/common";

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [GameBoardCellComponent, NgForOf, NgIf],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss'
})
export class GameBoardComponent implements OnInit {
  rows = 7;
  cols = 7;
  board: { player: string }[][] = [];
  player: string = 'A';
  winner = false;

  ngOnInit(): void {
    this.reset();
  }

  onCellSelected(i: number, j: number) {
    if (this.winner || this.board[i][j].player) {
      return;
    }
    if (!this.board[i][j].player) {
      this.board[i][j].player = this.player;
    }
    this.board[i][j].player = this.player;
    this.winner = this.checkHorizontal();
    if (this.winner) {
      return;
    }
    this.winner = this.checkVertical();
    if (this.winner) {
      return;
    }
    this.winner = this.checkDiagonal();
    if (this.winner) {
      return;
    }
    this.player = this.player === 'A' ? 'B' : 'A';
  }

  reset() {
    this.board = Array.from({length: this.rows}, () => Array.from({length: this.cols}, () => ({player: ''})));
    this.player = 'A';
    this.winner = false;
  }

  private checkHorizontal() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols - 3; col++) {
        if (this.board[row][col].player === this.player &&
          this.board[row][col + 1].player === this.player &&
          this.board[row][col + 2].player === this.player &&
          this.board[row][col + 3].player === this.player)
          return true;
      }
    }
    return false;
  }

  private checkVertical() {
    for (let row = 0; row < this.rows - 3; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (this.board[row][col].player === this.player &&
          this.board[row + 1][col].player === this.player &&
          this.board[row + 2][col].player === this.player &&
          this.board[row + 3][col].player === this.player)
          return true;
      }
    }
    return false;
  }

  private checkDiagonal() {
    // Check for negative slope
    for (let row = 0; row < this.rows - 3; row++) {
      for (let col = 0; col < this.cols - 3; col++) {
        if (this.board[row][col].player === this.player &&
          this.board[row + 1][col + 1].player === this.player &&
          this.board[row + 2][col + 2].player === this.player &&
          this.board[row + 3][col + 3].player === this.player)
          return true;
      }
    }

    // Check for positive slope
    for (let row = 3; row < this.rows; row++) {
      for (let col = 0; col < this.cols - 3; col++) {
        if (this.board[row][col].player === this.player &&
          this.board[row - 1][col + 1].player === this.player &&
          this.board[row - 2][col + 2].player === this.player &&
          this.board[row - 3][col + 3].player === this.player)
          return true;
      }
    }
    return false;
  }
}
