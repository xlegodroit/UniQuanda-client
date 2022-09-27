import { Injectable } from '@angular/core';
import {
	Router,
	Resolve,
	RouterStateSnapshot,
	ActivatedRouteSnapshot,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, map } from 'rxjs';
import { UserSettingsDataResponseDTO } from '../models/user-settings-data.dto';
import { UserProfileApiService } from '../services/user-profile-api.service';

@Injectable({
	providedIn: 'root',
})
export class UserDataResolver implements Resolve<UserSettingsDataResponseDTO> {
	constructor(
		private readonly _userSettingsApiService: UserProfileApiService,
		private readonly _router: Router,
		private readonly _toastrService: ToastrService
	) {}

	resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<UserSettingsDataResponseDTO> | any {
		return this._userSettingsApiService
			.getUserDataForEditProfileSettings()
			.pipe(
				map((res) => {
					return res.body;
				}),
				catchError((error) => {
					if (error.status === 404 || error.status === 500) {
						this._toastrService.error('Błąd ładowania strony', 'Błąd');
						return this._router.navigate(['..']);
					}
					return this._router.navigate(['..']);
				})
			);
	}
}
