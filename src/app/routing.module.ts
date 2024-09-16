import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { GameComponent } from './pages/game/game.component';

const routes: Routes = [
  {
    title: 'Login',
    path: 'login',
    component: LoginComponent
  },
  {
    title: 'Game',
    path: 'game',
    component: GameComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
