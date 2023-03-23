import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from './shared/services/localStorage.service';
import { AuthService } from './shared/services/auth.service';
import { UserPageComponent } from './components/user-page/user-page.component';
import { MessageWindowComponent } from './shared/components/message-window/message-window.component';
import { MessageService } from './shared/services/message.service';
import { HeroSelectPageComponent } from './components/hero-select-page/hero-select-page.component';
import { HeroCardComponent } from './shared/components/hero-card/hero-card.component';
import { HeroesPageComponent } from './components/heroes-page/heroes-page.component';
import { HttpClientModule } from "@angular/common/http";
import { HeroesService } from "./shared/services/heroes.service";

@NgModule({
	declarations: [
		AppComponent,
		MainLayoutComponent,
		HeaderComponent,
		LoginPageComponent,
		UserPageComponent,
		MessageWindowComponent,
		HeroSelectPageComponent,
  HeroCardComponent,
  HeroesPageComponent
	],
	imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule],
	providers: [LocalStorageService, AuthService, MessageService, HeroesService],
	bootstrap: [AppComponent]
})
export class AppModule {}
