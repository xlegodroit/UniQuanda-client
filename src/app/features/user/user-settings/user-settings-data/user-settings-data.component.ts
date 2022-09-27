import { StorageService } from 'src/app/core/services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { UserProfileApiService } from '../services/user-profile-api.service';
import { RegisterValidationService } from './../../../public/register/services/register-validation.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { plLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ActivatedRoute } from '@angular/router';
import { UserSettingsDataResponseDTO } from '../models/user-settings-data.dto';
import * as moment from 'moment';
import { UserDataService } from 'src/app/core/services/user-data.service';
defineLocale('pl', plLocale);

@Component({
	selector: 'app-user-settings-data',
	templateUrl: './user-settings-data.component.html',
	styleUrls: ['./user-settings-data.component.scss'],
})
export class UserSettingsDataComponent {
	public form: FormGroup;
	public user: UserSettingsDataResponseDTO | undefined;

	public backgroundAvatar = 'common/user-profile/deafult_user_avatar.svg';
	public backgroundBanner = 'common/user-profile/default_user_banner.svg';

	private userAvatar: File | null;
	private userBanner: File | null;

	constructor(
		private readonly _registerValidationService: RegisterValidationService,
		private readonly _bsLocaleService: BsLocaleService,
		private readonly _route: ActivatedRoute,
		private readonly _userSettingsApiService: UserProfileApiService,
		private readonly _toastrService: ToastrService,
		private readonly _storageService: StorageService,
		private readonly _userdataService: UserDataService
	) {
		this._bsLocaleService.use('pl');
		this._route.data.subscribe((data: any) => {
			this.user = data.appUser;
		});
		this.userAvatar = null;
		this.userBanner = null;

		this.form = new FormGroup({
			firstName: new FormControl(this.user?.firstName, [
				Validators.maxLength(35),
			]),
			lastName: new FormControl(this.user?.lastName, [
				Validators.maxLength(51),
			]),
			birthdate: new FormControl(
				this.user?.birthdate !== null
					? moment(this.user?.birthdate).format('DD/MM/yyyy')
					: null,
				[this._registerValidationService.checkIfDateBeforeNow]
			),
			phoneNumber: new FormControl(this.user?.phoneNumber, [
				Validators.maxLength(22),
			]),
			city: new FormControl(this.user?.city, [Validators.maxLength(57)]),
			semanticScholarProfile: new FormControl(
				this.user?.semanticScholarProfile,
				[Validators.pattern('^https://www.semanticscholar.org/author/.*/.*$')]
			),
			aboutText: new FormControl(this.user?.aboutText, [
				Validators.maxLength(300),
			]),
		});
	}

	handleDateChange(date: Date) {
		if (date?.toString() === 'Invalid Date') {
			this.form.get('birthdate')?.setErrors({ invalidFormat: true });
		}
	}

	updateUser() {
		this.form.markAllAsTouched();
		if (this.form.invalid) return;

		const userFormData: FormData = new FormData();
		userFormData.append('FirstName', this.form.get('firstName')?.value ?? '');
		userFormData.append('LastName', this.form.get('lastName')?.value ?? '');
		if (this.form.get('birthdate')?.value)
			userFormData.append(
				'Birthdate',
				moment(this.form.get('birthdate')?.value ?? '').format()
			);
		userFormData.append(
			'PhoneNumber',
			this.form.get('phoneNumber')?.value ?? ''
		);
		userFormData.append('City', this.form.get('city')?.value ?? '');
		userFormData.append(
			'SemanticScholarProfile',
			this.form.get('semanticScholarProfile')?.value ?? ''
		);
		userFormData.append('AboutText', this.form.get('aboutText')?.value ?? '');
		if (this.userBanner) userFormData.append('Banner', this.userBanner);
		if (this.userAvatar) userFormData.append('Avatar', this.userAvatar);

		this._userSettingsApiService.updateUser(userFormData).subscribe((res) => {
			if (res.status === 200) {
				this._toastrService.success('Sukces', 'Twoje zmiany zostały zapisane');
				this._userdataService.setAvatar(res.body.avatarUrl);
			} else if (res.status === 404) {
				this._toastrService.error('Błąd', 'Błąd przetwarzania danych');
			} else {
				this._toastrService.error('Błąd', res?.body?.avatarUrl?.toString());
			}
		});
	}

	updateAvatar(file: File | null) {
		this.userAvatar = file;
	}

	updateBanner(file: File | null) {
		this.userBanner = file;
	}
}
