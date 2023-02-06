import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService } from 'src/app/services/api/api.service';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

import { ClientsComponent } from './clients.component';
import { of } from 'rxjs';
import { EventEmitter } from '@angular/core';

describe('ClientsComponent', () => {
  let component: ClientsComponent;
  let fixture: ComponentFixture<ClientsComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let tfrManagementServiceSpy: jasmine.SpyObj<TfrManagementService>;

  beforeEach(async () => {
    
    const apiSpy = jasmine.createSpyObj('ApiService', {
      'getClientData': of(''),
      'getClientAttributes': of(''),
    },
    {
      clientReset: of({}),
      getClients: of([])
    });
    const tfrManagementSpy = jasmine.createSpyObj('TfrManagementService', [
      'getClientName',
      'project',
      'getBasicDetails',
    ]);
    await TestBed.configureTestingModule({
      declarations: [ClientsComponent],
      imports: [ HttpClientTestingModule, MatSnackBarModule, MatDialogModule ],
      providers: [
        { provide: ApiService, useValue: apiSpy },
        { provide: TfrManagementService, useValue: tfrManagementSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsComponent);
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    tfrManagementServiceSpy = TestBed.inject(
      TfrManagementService
    ) as jasmine.SpyObj<TfrManagementService>;
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.existingDetails = {
      name: 'Test Project',
      start_date: new Date('01/01/2023'),
      end_date: new Date('02/01/2023'),
      client_id: 2,
      client_specific: { Department: 'Finance', 'ED/MD': 'Lorem Ipsum' },
      status: 'DRAFT',
    };
    component.editMode = false;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
