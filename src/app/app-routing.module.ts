import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { AuthGuardService } from './shared/services/auth.guard.service';
import { HeroSelectPageComponent } from "./components/hero-select-page/hero-select-page.component";

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: '/user'},
	{ path: 'login', component: LoginPageComponent },
	{ path: 'user', component: UserPageComponent, canActivate: [AuthGuardService], children: [
      {path: 'search', component: HeroSelectPageComponent, canActivate: [AuthGuardService]}
    ]}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
