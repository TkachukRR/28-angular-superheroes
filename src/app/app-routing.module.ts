import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { AuthGuard } from './shared/services/auth.guard';
import { HeroSelectPageComponent } from './components/hero-select-page/hero-select-page.component';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: '/user/search' },
	{ path: 'login', component: LoginPageComponent },
	{
		path: 'user',
		component: UserPageComponent,
		canActivate: [AuthGuard],
		children: [{ path: 'search', component: HeroSelectPageComponent }]
	},
	{ path: '**', redirectTo: '/user/search' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
