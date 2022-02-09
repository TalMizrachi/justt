import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { HttpClientModule } from  '@angular/common/http';
import { SearchPipe } from './pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { ProfileViewComponent } from './profile-view/profile-view.component';
@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    SearchPipe,
    ProfileViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
