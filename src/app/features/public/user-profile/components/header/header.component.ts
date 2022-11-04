import { Component, Input } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { Observable } from 'rxjs';
import { IUserClaims } from 'src/app/core/models/user-claims.model';
import { DialogService } from 'src/app/core/services/dialog.service';
import { ReportDialogComponent } from 'src/app/shared/components/dialogs/report-dialog/report-dialog.component';
import { AcademicTitleType } from '../../models/acedemic-title';
import { IUserProfileResponseDTO } from '../../models/user-profile.dto';

@Component({
	selector: 'app-user-profile-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	providers: [
		{
			provide: BsDropdownConfig,
			useValue: { autoClose: true },
		},
	],
})
export class HeaderComponent {
	@Input()
	public profile$!: Observable<IUserProfileResponseDTO | null>;
	@Input()
	public userClaims$!: Observable<IUserClaims | null>;

	constructor(private readonly _dialogService: DialogService) {}

	getAcademicTitleTypeColor(type: AcademicTitleType) {
		switch (type) {
			case AcademicTitleType.Engineer:
				return '#1AA39D';
			case AcademicTitleType.Bachelor:
				return '#262B90';
			case AcademicTitleType.Academic:
				return '#FE4D10';
			default:
				return '#000000';
		}
	}

	reportUser(userId: number) {
		this._dialogService.open(ReportDialogComponent, {
			data: { reportType: 'user', reportedEntityId: userId },
		});
	}
}
