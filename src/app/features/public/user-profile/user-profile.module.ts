import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { UserProfileComponent } from './user-profile.component';
import { HeaderComponent } from './components/header/header.component';
import { StatsComponent } from './components/header/stats/stats.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		UserProfileRoutingModule,
		SharedModule,
		ToastrModule.forRoot(),
		BsDropdownModule.forRoot(),
	],
	declarations: [UserProfileComponent, HeaderComponent, StatsComponent],
})
export class UserProfileModule {}
