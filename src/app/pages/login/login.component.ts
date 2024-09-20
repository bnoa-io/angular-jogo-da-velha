import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { MatchStateService } from 'src/app/services/match-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public filledPlayers: boolean = false;

  public form: FormGroup = this._fb.group({
    playerOne: ['', Validators.required],
    playerTwo: ['', Validators.required],
  });

  constructor(
    private _fb: FormBuilder,
    private _matchStateService: MatchStateService,
    private _router: Router
  ){}

  public disableButton(): boolean {
    return this.form.invalid;
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this._randomizeStarterPlayer();
      this.filledPlayers = true;

      setTimeout(() => {
        this._router.navigate(['game']);
      }, 2000);
    }
  }

  private _randomizeStarterPlayer(): void {
    const playerNum = (Math.ceil(Math.random() * 2));

    this._matchStateService.playerOne.next(playerNum == 1 ? this.playerOne?.value : this.playerTwo?.value);
    this._matchStateService.playerTwo.next(playerNum == 1 ? this.playerTwo?.value : this.playerOne?.value);
    this._matchStateService.currentUser.next(this._matchStateService.playerOne.value);
    this._matchStateService.numberCurrentUser.next(playerNum);
  }

  get playerOne() {
   return this.form.get('playerOne');
  }

  get playerTwo() {
   return this.form.get('playerTwo');
  }
}
