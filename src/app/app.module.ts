import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WycieczkiComponent } from './wycieczki/wycieczki.component';

@NgModule({
  declarations: [
    AppComponent,
    WycieczkiComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
