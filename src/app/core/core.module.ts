import { HandleErrorService } from './services/handle-error.service';
import { HandleErrorInterceptorService } from './interceptors/handle-error-interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StorageService } from './services/storage.service';
import { UserDataService } from './services/user-data.service';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
	providers: [
		StorageService,
		UserDataService,
		HandleErrorService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HandleErrorInterceptorService,
			multi: true,
		},
	],
	declarations: [HeaderComponent, NavBarComponent],
	imports: [
		RouterModule,
		ToastrModule.forRoot(),
		HttpClientModule,
		CommonModule,
		BrowserModule,
	],
	exports: [HeaderComponent, NavBarComponent],
})
export class CoreModule {}
