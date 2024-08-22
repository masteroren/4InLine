import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgStyle } from "@angular/common";

@Component({
  selector: 'app-game-board-cell',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './game-board-cell.component.html',
  styleUrl: './game-board-cell.component.scss'
})
export class GameBoardCellComponent {
  @Input() player: string = '';
  @Output() cellSelected = new EventEmitter();
}
