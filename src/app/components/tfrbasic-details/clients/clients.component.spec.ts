import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventEmitter } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { ResponseHandlerService } from 'src/app/services/response-handler/response-handler.service';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';
import {
  DummyAllClientAttributes,
  DummyClientAttributes,
  DummyClients,
  DummyError0,
  DummyError400,
  DummyProject,
  DummyProjectBasicDetailsInProgress,
} from 'src/app/types/dummy-data';
import { ClientsComponent } from './clients.component';

describe('ClientsComponent', () => {
  let component: ClientsComponent;
  let fixture: ComponentFixture<ClientsComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let tfrManagementServiceSpy: jasmine.SpyObj<TfrManagementService>;
  let responseHandlerSpy: jasmine.SpyObj<ResponseHandlerService>;

  beforeEach(async () => {
    const apiSpy = jasmine.createSpyObj('ApiService', {
      getClients: of([]),
      getAllClientAttributes: of([]),
    });
    const tfrManagementSpy = jasmine.createSpyObj(
      'TfrManagementService',
      ['getBasicDetails', 'setServerDown'],
      {
        clientReset: new EventEmitter<boolean>(),
      }
    );
    await TestBed.configureTestingModule({
      declarations: [ClientsComponent],
      imports: [HttpClientTestingModule, MatSnackBarModule, MatDialogModule],
      providers: [
        { provide: ApiService, useValue: apiSpy },
        { provide: TfrManagementService, useValue: tfrManagementSpy },
        {
          provide: ResponseHandlerService,
          useValue: jasmine.createSpyObj('ResponeHandlerService', ['badGet']),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsComponent);
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    tfrManagementServiceSpy = TestBed.inject(
      TfrManagementService
    ) as jasmine.SpyObj<TfrManagementService>;
    responseHandlerSpy = TestBed.inject(
      ResponseHandlerService
    ) as jasmine.SpyObj<ResponseHandlerService>;
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.editMode = false;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call resetClientContols when clientReset is emitted', () => {
    spyOn(component, 'resetClientControls').and.stub();

    tfrManagementServiceSpy.clientReset.emit(true);

    expect(component.resetClientControls).toHaveBeenCalledTimes(1);
  });

  it('getClientsObserver.next should be called if getClients returns valid response', () => {
    apiServiceSpy.getClients.and.returnValue(of(DummyClients));

    spyOn(component.getClientsObserver, 'next').and.stub();

    component.ngOnInit();

    expect(component.getClientsObserver.next).toHaveBeenCalledTimes(1);
  });

  it('getClientsObserver.next should set clients to provided value', () => {
    expect(component.clients).toEqual([]);
    component.getClientsObserver.next(DummyClients);

    expect(component.clients).toEqual(DummyClients);
  });

  it('getClientsObserver.next should call getAllClientAttributes', () => {
    expect(apiServiceSpy.getAllClientAttributes).toHaveBeenCalledTimes(1);

    component.getClientsObserver.next(DummyClients);

    expect(apiServiceSpy.getAllClientAttributes).toHaveBeenCalledTimes(2);
  });

  it('getClientsObserver.error should be called if getClients returns an error response', () => {
    apiServiceSpy.getClients.and.returnValue(
      throwError(() => {
        new Error();
      })
    );

    spyOn(component.getClientsObserver, 'error').and.stub();

    component.ngOnInit();

    expect(component.getClientsObserver.error).toHaveBeenCalledTimes(1);
  });

  it('is getClientsObserver.error is called with error status 0, serverDown should be set', () => {
    component.getClientsObserver.error(DummyError0);

    expect(tfrManagementServiceSpy.setServerDown).toHaveBeenCalled();
  });

  it('is getClientsObserver.error is called with error status of not 0, serverDown should not be set', () => {
    component.getClientsObserver.error(DummyError400);

    expect(tfrManagementServiceSpy.setServerDown).toHaveBeenCalledTimes(0);
  });

  it('getAllClientAttributesObserver.next should be called if getAllAttributes returns valid response', () => {
    apiServiceSpy.getAllClientAttributes.and.returnValue(
      of(DummyAllClientAttributes)
    );

    spyOn(component.getAllClientAttributesObserver, 'next').and.stub();

    component.ngOnInit();

    expect(
      component.getAllClientAttributesObserver.next
    ).toHaveBeenCalledOnceWith(DummyAllClientAttributes);
  });

  it('getAllClientAttributesObserver.next should set allAttributes', () => {
    expect(component.allAttributes).toEqual([]);

    component.getAllClientAttributesObserver.next(DummyAllClientAttributes);

    expect(component.allAttributes).toEqual(DummyAllClientAttributes);
  });

  it('getAllClientAttributesObserver.next should call onSelectedClient with correct argument if in editMode', () => {
    component.editMode = true;
    component.existingDetails = DummyProjectBasicDetailsInProgress;
    component.clients = DummyClients;

    spyOn(component, 'onSelectedClient').and.stub();

    component.getAllClientAttributesObserver.next(DummyAllClientAttributes);

    expect(component.onSelectedClient).toHaveBeenCalledOnceWith(
      DummyClients[DummyProjectBasicDetailsInProgress.client_id - 1]
    );
  });

  it('getAllClientAttributesObserver.next should not call onSelectedClient if not in editMode', () => {
    component.editMode = false;

    spyOn(component, 'onSelectedClient').and.stub();

    component.getAllClientAttributesObserver.next(DummyAllClientAttributes);

    expect(component.onSelectedClient).toHaveBeenCalledTimes(0);
  });

  it('getAllClientAttributesObserver should call error if getAllAttributes returns an erroneous response', () => {
    apiServiceSpy.getAllClientAttributes.and.returnValue(
      throwError(() => {
        new Error();
      })
    );

    spyOn(component.getAllClientAttributesObserver, 'error').and.stub();

    component.ngOnInit();

    expect(
      component.getAllClientAttributesObserver.error
    ).toHaveBeenCalledTimes(1);
  });

  it('getAllClientAttributesObserver.error should call badGet and setServerDown if error status is 0', () => {
    component.getAllClientAttributesObserver.error(DummyError0);

    expect(responseHandlerSpy.badGet).toHaveBeenCalledTimes(1);
    expect(tfrManagementServiceSpy.setServerDown).toHaveBeenCalled();
  });

  it('getAllClientAttributesObserver.error should not call badGet and setServerDown if error status is not 0', () => {
    component.getAllClientAttributesObserver.error(DummyError400);

    expect(responseHandlerSpy.badGet).toHaveBeenCalledTimes(0);
    expect(tfrManagementServiceSpy.setServerDown).toHaveBeenCalledTimes(0);
  });

  it('onAttributesUpdated should emit when attributes formArray is changed', fakeAsync(() => {
    const dummyGroup = new FormGroup({
      name: new FormControl(''),
      attributeValues: new FormArray([new FormControl('')]),
    });
    expect(component.clientGroup).toBeDefined();

    spyOn(component.onAttributesUpdated, 'emit').and.stub();

    component.getAttributes().push(new FormControl(''));

    // needed due to debounce
    tick(501);

    expect(component.onAttributesUpdated.emit).toHaveBeenCalledTimes(1);
  }));

  it('resetClientControls should set existingDetails if client name matches', () => {
    component.clientGroup.get('name')?.setValue(DummyClients[0].name);
    (tfrManagementServiceSpy as any).getClientName = DummyClients[0].name;
    (tfrManagementServiceSpy as any).getBasicDetails =
      DummyProjectBasicDetailsInProgress;

    expect(component.existingDetails).toBeUndefined();

    spyOn(component, 'fillAttributesFromExisting').and.stub();

    component.resetClientControls();

    expect(component.existingDetails).toEqual(
      DummyProjectBasicDetailsInProgress
    );
    expect(component.fillAttributesFromExisting).toHaveBeenCalledTimes(1);
  });

  it('resetClientControls should set clientGroup name if client names do not match', () => {
    (tfrManagementServiceSpy as any).getClientName = DummyClients[0].name;
    (tfrManagementServiceSpy as any).getBasicDetails =
      DummyProjectBasicDetailsInProgress;
    (tfrManagementServiceSpy as any).project = DummyProject;

    expect(
      component.clientGroup.value.name === DummyClients[0].name
    ).toBeFalsy();

    spyOn(component, 'fillAttributesFromExisting').and.stub();

    spyOn(component, 'onSelectedClient').and.stub();

    component.resetClientControls();

    expect(component.existingDetails).toEqual(
      DummyProjectBasicDetailsInProgress
    );
    expect(component.fillAttributesFromExisting).toHaveBeenCalledTimes(1);
    expect(component.clientGroup.value.name).toEqual(DummyClients[0].name);
  });

  it('resetClientControls should call onSelectedClient with correct value if client names do not match', () => {
    (tfrManagementServiceSpy as any).getClientName = DummyClients[0].name;
    (tfrManagementServiceSpy as any).getBasicDetails =
      DummyProjectBasicDetailsInProgress;
    (tfrManagementServiceSpy as any).project = DummyProject;
    component.clients = DummyClients;

    spyOn(component, 'fillAttributesFromExisting').and.stub();
    spyOn(component, 'onSelectedClient').and.stub();

    component.resetClientControls();

    expect(component.onSelectedClient).toHaveBeenCalledWith(
      DummyClients[DummyProject.client_id - 1]
    );
  });

  it('fillAttributesFromExisting should work', () => {
    let projectBasicDetails = DummyProjectBasicDetailsInProgress;
    const dummyValues = ['value 1', 'value 2', 'value 3'];
    projectBasicDetails.client_specific = {};

    component.clientGroup.controls['attributeValues'] = new FormArray([]);

    for (let i = 0; i < dummyValues.length; i++) {
      projectBasicDetails.client_specific[
        DummyClientAttributes[i].attribute_name
      ] = dummyValues[i];

      (component.clientGroup.controls['attributeValues'] as FormArray).push(
        new FormControl('')
      );
    }

    component.existingDetails = projectBasicDetails;

    component.attributes = DummyClientAttributes;

    component.fillAttributesFromExisting();

    for (let i = 0; i < dummyValues.length; i++) {
      expect(
        (component.clientGroup.controls['attributeValues'] as FormArray).at(i)
          .value
      ).toEqual(dummyValues[i]);
    }
  });

  it('fillAttributesFromExisting should not call if attributes is undefined', () => {
    expect(component.attributes).toBeUndefined();

    let projectBasicDetails = DummyProjectBasicDetailsInProgress;
    const dummyValues = ['value 1', 'value 2', 'value 3'];
    projectBasicDetails.client_specific = {};

    component.clientGroup.controls['attributeValues'] = new FormArray([]);

    for (let i = 0; i < dummyValues.length; i++) {
      projectBasicDetails.client_specific[
        DummyClientAttributes[i].attribute_name
      ] = dummyValues[i];

      (component.clientGroup.controls['attributeValues'] as FormArray).push(
        new FormControl('')
      );
    }

    component.existingDetails = projectBasicDetails;

    component.fillAttributesFromExisting();

    for (let i = 0; i < dummyValues.length; i++) {
      expect(
        (component.clientGroup.controls['attributeValues'] as FormArray).at(i)
          .value
      ).toEqual('');
    }
  });

  it('fillAttributesFromExisting should not call if existingDetails is undefined', () => {
    expect(component.existingDetails).toBeUndefined();

    let projectBasicDetails = DummyProjectBasicDetailsInProgress;
    const dummyValues = ['value 1', 'value 2', 'value 3'];
    projectBasicDetails.client_specific = {};

    component.clientGroup.controls['attributeValues'] = new FormArray([]);

    for (let i = 0; i < dummyValues.length; i++) {
      projectBasicDetails.client_specific[
        DummyClientAttributes[i].attribute_name
      ] = dummyValues[i];

      (component.clientGroup.controls['attributeValues'] as FormArray).push(
        new FormControl('')
      );
    }

    component.attributes = DummyClientAttributes;

    component.fillAttributesFromExisting();

    for (let i = 0; i < dummyValues.length; i++) {
      expect(
        (component.clientGroup.controls['attributeValues'] as FormArray).at(i)
          .value
      ).toEqual('');
    }
  });

  it('onSelectedClient should set attributes and formArray to empty if client is undefined', () => {
    component.attributes = DummyClientAttributes;
    (component.clientGroup.controls['attributeValues'] as FormArray).push(
      new FormControl('')
    );

    expect(component.attributes).toEqual(DummyClientAttributes);
    expect(
      (component.clientGroup.controls['attributeValues'] as FormArray).length
    ).toBeTruthy();

    component.onSelectedClient(undefined);

    expect(component.attributes).toEqual([]);
    expect(
      (component.clientGroup.controls['attributeValues'] as FormArray).length
    ).toBeFalsy();
  });

  it('onSelectedClient should emit onSelected and attributesSelected if client is defined', () => {
    component.allAttributes = DummyAllClientAttributes;
    const DummyClient = DummyClients[0];

    spyOn(component.onSelected, 'emit').and.stub();
    spyOn(component.attributesSelected, 'emit').and.stub();
    spyOn(component, 'fillAttributesFromExisting').and.stub();

    component.onSelectedClient(DummyClient);

    expect(component.onSelected.emit).toHaveBeenCalledOnceWith(DummyClient);
    expect(component.attributesSelected.emit).toHaveBeenCalledOnceWith(
      DummyAllClientAttributes[DummyClient.id - 1]
    );
    expect(component.fillAttributesFromExisting).toHaveBeenCalledTimes(0);
  });

  it('onSelectedClient should set attributes if client is defined', () => {
    component.allAttributes = DummyAllClientAttributes;
    const DummyClient = DummyClients[0];

    spyOn(component.onSelected, 'emit').and.stub();
    spyOn(component.attributesSelected, 'emit').and.stub();
    spyOn(component, 'fillAttributesFromExisting').and.stub();

    expect(component.attributes).toBeUndefined();

    component.onSelectedClient(DummyClient);

    expect(component.attributes).toEqual(
      DummyAllClientAttributes[DummyClient.id - 1]
    );
  });

  it('onSelectedClient should set client name if client is defined', () => {
    component.allAttributes = DummyAllClientAttributes;
    const DummyClient = DummyClients[0];

    spyOn(component.onSelected, 'emit').and.stub();
    spyOn(component.attributesSelected, 'emit').and.stub();
    spyOn(component, 'fillAttributesFromExisting').and.stub();

    expect(component.clientGroup.value.name).toEqual('');

    component.onSelectedClient(DummyClient);

    expect(component.clientGroup.value.name).toEqual(DummyClient.name);
  });

  it('onSelectedClient should populate formArray with correct number of controls', () => {
    component.allAttributes = DummyAllClientAttributes;
    const DummyClient = DummyClients[0];

    spyOn(component.onSelected, 'emit').and.stub();
    spyOn(component.attributesSelected, 'emit').and.stub();
    spyOn(component, 'fillAttributesFromExisting').and.stub();

    (component.clientGroup.controls['attributeValues'] as FormArray).push(
      new FormControl('')
    );

    expect(
      (component.clientGroup.controls['attributeValues'] as FormArray).length
    ).toEqual(1);

    component.onSelectedClient(DummyClient);

    expect(
      (component.clientGroup.controls['attributeValues'] as FormArray).length
    ).toEqual(DummyAllClientAttributes[DummyClient.id - 1].length);
  });

  it('onSelectedClient should populate formArray with correct number of controls', () => {
    component.allAttributes = DummyAllClientAttributes;
    const DummyClient = DummyClients[0];

    spyOn(component.onSelected, 'emit').and.stub();
    spyOn(component.attributesSelected, 'emit').and.stub();
    spyOn(component, 'fillAttributesFromExisting').and.stub();

    (tfrManagementServiceSpy as any).getClientName = DummyClient.name;

    component.onSelectedClient(DummyClient);

    expect(component.fillAttributesFromExisting).toHaveBeenCalledTimes(1);
  });
});
