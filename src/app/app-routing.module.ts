import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { AuthGuard } from './shared/services/auth.guard';
import { HeroSearchPageComponent } from './components/hero-search-page/hero-search-page.component';
import { UserInfoPageComponent } from './components/user-info-page/user-info-page.component';
import { UserHeroesComponent } from './components/user-heroes/user-heroes.component';
import { UserBattlesHistoryComponent } from './components/user-battles-history/user-battles-history.component';
import { UserPowersupsComponent } from './components/user-powersups/user-powersups.component';
import { HeroInfoPageComponent } from './shared/components/hero-info-page/hero-info-page.component';
import { BattlePageComponent } from './components/battle-page/battle-page.component';
import { CheckFavouritesGuard } from './shared/services/check-favourites.guard';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: '/user/search' },
	{ path: 'login', component: LoginPageComponent },
	{
		path: 'user',
		component: UserPageComponent,
		canActivate: [AuthGuard],
		children: [
			{ path: 'search', component: HeroSearchPageComponent, canActivate: [AuthGuard] },
			{
				path: 'info',
				component: UserInfoPageComponent,
				canActivate: [AuthGuard],
				children: [
					{ path: 'heroes', component: UserHeroesComponent, canActivate: [AuthGuard] },
					{ path: 'battles', component: UserBattlesHistoryComponent, canActivate: [AuthGuard] },
					{ path: 'powerups', component: UserPowersupsComponent, canActivate: [AuthGuard] }
				]
			}
		]
	},
	{ path: 'hero-info/:heroName', component: HeroInfoPageComponent, canActivate: [AuthGuard] },
	{ path: 'battle', component: BattlePageComponent, canActivate: [AuthGuard, CheckFavouritesGuard] },
	{ path: '**', redirectTo: '/user/search' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
