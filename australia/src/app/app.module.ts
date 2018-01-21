import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LocationsService } from './locations.service';
import { InputFormComponent } from './input-form/input-form.component';
import { HttpClientModule  } from '@angular/common/http';

const appRoutes: Routes = [
  { path: '', component: AppComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    InputFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [LocationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
