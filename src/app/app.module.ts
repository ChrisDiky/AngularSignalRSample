import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignalRTestComponent } from './page/signal-r-test/signal-r-test.component';

import { environment } from 'src/environments/environment';
import { SignalRResolver } from './app.resolve';
import { SignalRModule } from 'ng2-signalr';
import { SignalRConfiguration } from 'ng2-signalr';

export function createConfig(): SignalRConfiguration {
  const c = new SignalRConfiguration();
  c.hubName = 'broadcastHub';
  c.qs = {};
  c.url = environment.APIWebSite;
  c.logging = false;

  // >= v5.0.0
  c.executeEventsInZone = true; // optional, default is true
  c.executeErrorsInZone = false; // optional, default is false
  c.executeStatusChangeInZone = true; // optional, default is true
  return c;
}

@NgModule({
  declarations: [
    AppComponent,
    SignalRTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SignalRModule.forRoot(createConfig),
  ],
  providers: [SignalRResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
