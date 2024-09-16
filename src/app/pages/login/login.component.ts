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
    playerTwo: ['', Validators.required]
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
      this._matchStateService.playerOne.next(this.playerOne?.value);
      this._matchStateService.playerTwo.next(this.playerTwo?.value);
      this._randomizeStarterPlayer();
      this.filledPlayers = true;

      setTimeout(() => {
        this._router.navigate(['game']);
      }, 2000);
    }
  }

  private _randomizeStarterPlayer(): void {
    const playerNum = (Math.ceil(Math.random() * 2));
    this._matchStateService.currentUser.next(playerNum === 1 ? this.playerOne?.value : this.playerTwo?.value);
    this._matchStateService.numberCurrentUser.next(playerNum);
  }

  get playerOne() {
   return this.form.get('playerOne');
  }

  get playerTwo() {
   return this.form.get('playerTwo');
  }
}
