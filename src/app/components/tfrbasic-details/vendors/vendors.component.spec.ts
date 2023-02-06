import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService } from 'src/app/services/api/api.service';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';

import { VendorsComponent } from './vendors.component';

fdescribe('VendorsComponent', () => {
  let component: VendorsComponent;
  let fixture: ComponentFixture<VendorsComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let tfrManagementServiceSpy: jasmine.SpyObj<TfrManagementService>;

  beforeEach(async () => {
    const apiSpy = jasmine.createSpyObj('ApiService', [
      'vendorReset',
      'getVendorData',
      'getVendorAttributes',
    ]);
    const tfrManagementSpy = jasmine.createSpyObj('TfrManagementService', [
      'getVendorName',
      'project',
      'getBasicDetails',
    ]);
    await TestBed.configureTestingModule({
      declarations: [VendorsComponent],
      providers: [
        { provide: ApiService, useValue: apiSpy },
        { provide: ApiService, useValue: tfrManagementSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VendorsComponent);
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
      vendor_id: 2,
      vendor_specific: { Department: 'Finance', 'ED/MD': 'Lorem Ipsum' },
      status: 'DRAFT',
    };
    component.editMode = false;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Test test', () => {
    expect(1).toBeLessThan(2);
  });
});
