import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ErrorInterceptor, JwtInterceptor, SharedModule } from "@shared";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { TopNavbarComponent } from "./layout/top-navbar/top-navbar.component";

@NgModule({
    declarations: [
        AppComponent,
        TopNavbarComponent,
        FooterComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        SharedModule,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
    
})
export class AppModule {}
