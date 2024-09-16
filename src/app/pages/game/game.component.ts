import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchStateService } from 'src/app/services/match-state.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  public canPlay: boolean = true;
  public currentUser: string = this._matchStateService.currentUser.value;
  public playerOne: string = this._matchStateService.playerOne.value;
  public playerTwo: string = this._matchStateService.playerTwo.value;
  public playerOnePoints: number = 0;
  public playerTwoPoints: number = 0;
  public finalRound: boolean = false;
  public showOverlay: boolean = true;

  private _possibilities: Array<string[]> = this._matchStateService.chancesOfWinning();
  private _playerOneMovements: string[] = [];
  private _playerTwoMovements: string[] = [];
  private _totalMoves: number = 0;

  constructor(
    private _matchStateService: MatchStateService,
    private _router: Router
  ){}

  ngOnInit(): void {
    if (!this._matchStateService.currentUser.value?.trim()) this._router.navigate(['login']);
    setTimeout(()=> this.showOverlay = false, 1500);
  }

  public onClick(event: MouseEvent, form: HTMLFormElement): void {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    if (!input.value.trim()) {
      const movement: string = input.dataset['col'] as string;
      this._totalMoves++;

      if (this.currentUser === this.playerOne) {
        this._playerOneMovements.push(movement);
        input.value = 'X';
      } else {
        this._playerTwoMovements.push(movement);
        input.value = 'O';
      }

      this._checkWin(form);
      this.currentUser = (this.currentUser === this.playerOne ? this.playerTwo : this.playerOne);
    }
  }

  public onReset(form: HTMLFormElement): void {
    this.finalRound = true;
    this.canPlay = false;
    this.playerOnePoints = 0;
    this.playerTwoPoints = 0;
    this._playerTwoMovements = [];
    this._playerOneMovements = [];
    this._totalMoves = 0;

    this.currentUser === this.playerOne ? this.playerTwo : this.playerOne;
    this.showOverlay = true;
    setTimeout(()=> {
      form.querySelectorAll('input').forEach(input => input.value = '' && input.classList.remove('anime'));
      this.finalRound = false;
      this.canPlay = true;
      this.showOverlay = false;
    }, 2000);
  }

  public onLeave(): void {
    this._router.navigate(['login'])
  }

  private _checkWin(form: HTMLFormElement): void {
    for (let possibilitie of this._possibilities) {
      let playerOneWin: boolean = this._playerOneMovements.sort().join('').includes(possibilitie.join(''));
      let playerTwoWin: boolean = this._playerTwoMovements.sort().join('').includes(possibilitie.join(''));
      if (playerOneWin || playerTwoWin) {
        this._setMatchConfiguration(true, form, possibilitie);
      } else if (this._totalMoves === 9) {
        this._setMatchConfiguration(false, form);
        break;
      }
    };
  }

  private _setMatchConfiguration(win: boolean, form: HTMLFormElement, possibilitie?: string[]): void {
    this.canPlay = false;
    this.finalRound = true;
    this.currentUser === this.playerOne ? this.playerOnePoints++ : this.playerTwoPoints++;
    this._playerOneMovements = [];
    this._playerTwoMovements = [];
    this._totalMoves = 0;

    Array.from(form.querySelectorAll('input'))
    .filter(input => {
      if (win && possibilitie) return possibilitie.some(item => item === input.dataset['col']);
      return input;
    })
    .forEach(input => input.classList.add('anime'));

    setTimeout(()=> {
      form.querySelectorAll('input').forEach(input => {
        input.value = '';
        input.classList.remove('anime')
      });
      this.finalRound = false;
      this.canPlay = true;
    }, 2000);

    setTimeout(()=> this.showOverlay = true, 2000);
    setTimeout(()=> this.showOverlay = false, 3500);
  }
}
