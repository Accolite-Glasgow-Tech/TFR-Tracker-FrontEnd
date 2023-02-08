import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';

import { ResponseHandlerService } from 'src/app/services/response-handler/response-handler.service';
import { TfrBasicDetailsComponent } from './tfr-basic-details.component';

fdescribe('TFRBasicDetailsComponent', () => {
  let component: TfrBasicDetailsComponent;
  let fixture: ComponentFixture<TfrBasicDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TfrBasicDetailsComponent],
      imports: [MatDialogModule],
      providers: [
        {
          provide: TfrManagementService,
          useValue: jasmine.createSpyObj(
            'TfrManagementService',
            [
              'setBasicDetails',
              'extractProject',
              'resetClientDetails',
              'getFromDatabase',
            ],
            ['getBasicDetails', 'project', 'getProjectId']
          ),
        },
        {
          provide: ResponseHandlerService,
          useValue: jasmine.createSpyObj('ResponseHandlerService', [
            'unsavedChangesDialogue',
            'badGet',
          ]),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TfrBasicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
