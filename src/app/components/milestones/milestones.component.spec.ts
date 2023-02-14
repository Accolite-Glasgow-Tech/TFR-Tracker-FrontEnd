import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilestoneManagerService } from 'src/app/services/milestone-manager/milestone-manager.service';
import { ResponseHandlerService } from 'src/app/services/response-handler/response-handler.service';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';
import { MilestonesComponent } from './milestones.component';

fdescribe('MilestonesComponent', () => {
  let component: MilestonesComponent;
  let fixture: ComponentFixture<MilestonesComponent>;
  let milestoneManagerSpy: jasmine.SpyObj<MilestoneManagerService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MilestonesComponent],
      providers: [
        {
          provide: MilestoneManagerService,
          useValue: jasmine.createSpyObj('MilestoneManagerService', ['']),
        },
        {
          provide: TfrManagementService,
          useValue: jasmine.createSpyObj('TfrManagementService', ['']),
        },
        {
          provide: ResponseHandlerService,
          useValue: jasmine.createSpyObj('ResponseHandlerService', ['']),
        },
        {
          provide: SnackBarService,
          useValue: jasmine.createSpyObj('SnackBarService', ['']),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MilestonesComponent);
    milestoneManagerSpy = TestBed.inject(
      MilestoneManagerService
    ) as jasmine.SpyObj<MilestoneManagerService>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('updateObserver.next should call update', () => {
    spyOn(component, 'update').and.stub();

    component.updateObserver.next();

    expect(component.update).toHaveBeenCalledTimes(1);
  });
});
