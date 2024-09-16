import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchStateService {
  public currentUser: BehaviorSubject<string>;
  public numberCurrentUser: BehaviorSubject<number>;
  public playerOne: BehaviorSubject<string>;
  public playerTwo: BehaviorSubject<string>;

  constructor() {
    this.currentUser = new BehaviorSubject<string>('');
    this.numberCurrentUser = new BehaviorSubject<number>(0);
    this.playerOne = new BehaviorSubject<string>('');
    this.playerTwo = new BehaviorSubject<string>('');
  }

  chancesOfWinning(): Array<string[]> {
    return [
      ['A1', 'B1', 'C1'], ['A1', 'A2', 'A3'], ['A1', 'B2', 'C3'],
      ['A2', 'B2', 'C2'], ['B1', 'B2', 'B3'], ['A3', 'B2', 'C1'],
      ['A3', 'B3', 'C3'], ['C1', 'C2', 'C3']
    ];
  }
}
