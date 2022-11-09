import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './layout/home/home.component';
import { LeftSidebarComponent } from './layout/left-sidebar/left-sidebar.component';
import { TopNavbarComponent } from './layout/top-navbar/top-navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopNavbarComponent,
    FooterComponent,
    LeftSidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

