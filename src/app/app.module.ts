import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// RUTAS
import { APP_ROUTES } from './app.routes';
// Fin RUTAS
// Modulos
import { PagesModules } from './pages/pages.module';
// FIn modulos
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
