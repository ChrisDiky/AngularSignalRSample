import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignalRResolver } from './app.resolve';
import { SignalRTestComponent } from './page/signal-r-test/signal-r-test.component';

const routes: Routes = [
  { path: 'SignalR/:sid', component: SignalRTestComponent, resolve: { connection: SignalRResolver } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
