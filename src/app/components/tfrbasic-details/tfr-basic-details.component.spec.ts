import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { ResponseHandlerService } from 'src/app/services/response-handler/response-handler.service';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';
import {
  DummyClients,
  DummyError0,
  DummyError400,
  DummyProject,
  DummyProject2,
  DummyProjectBasicDetailsDraft,
  DummyProjectBasicDetailsInProgress,
  DummyProjectResponseOk,
} from 'src/app/types/dummy-data';
import { TfrBasicDetailsComponent } from './tfr-basic-details.component';

describe('TFRBasicDetailsComponent', () => {
  let component: TfrBasicDetailsComponent;
  let fixture: ComponentFixture<TfrBasicDetailsComponent>;
  let tfrManagerSpy: jasmine.SpyObj<TfrManagementService>;
  let responseHandlerSpy: jasmine.SpyObj<ResponseHandlerService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TfrBasicDetailsComponent],
      imports: [MatDialogModule],
      providers: [
        {
          provide: TfrManagementService,
          useValue: jasmine.createSpyObj('TfrManagementService', [
            'setBasicDetails',
            'extractProject',
            'resetClientDetails',
            'getFromDatabase',
          ]),
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

    // spies
    tfrManagerSpy = TestBed.inject(
      TfrManagementService
    ) as jasmine.SpyObj<TfrManagementService>;
    responseHandlerSpy = TestBed.inject(
      ResponseHandlerService
    ) as jasmine.SpyObj<ResponseHandlerService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not open in edit mode if project is undefined', () => {
    (tfrManagerSpy as any).getBasicDetails = undefined;
    component.ngOnInit();
    expect(component.editMode).toBeFalsy();
  });

  it('should open in edit mode if project is provided', () => {
    (tfrManagerSpy as any).getBasicDetails = DummyProjectBasicDetailsInProgress;
    component.ngOnInit();

    expect(component.editMode).toBeTruthy();
    expect(component.projectToEdit).toEqual(DummyProjectBasicDetailsInProgress);
    expect(component.tfrDetails.get('name')?.value).toEqual(
      DummyProjectBasicDetailsInProgress.name
    );
    expect(component.tfrDetails.get('start_date')?.value).toEqual(
      DummyProjectBasicDetailsInProgress.start_date
    );
    expect(component.tfrDetails.get('end_date')?.value).toEqual(
      DummyProjectBasicDetailsInProgress.end_date
    );
  });

  it('should emit stepCompleted and editMode when opened in edit mode', fakeAsync(() => {
    (tfrManagerSpy as any).getBasicDetails = DummyProjectBasicDetailsInProgress;

    spyOn(component.editModeEmitter, 'emit');
    spyOn(component.stepCompletedEmitter, 'emit');

    component.ngOnInit();

    tick(100);

    expect(component.editMode).toBeTruthy();
    expect(component.editModeEmitter.emit).toHaveBeenCalledOnceWith(true);
    expect(component.stepCompletedEmitter.emit).toHaveBeenCalledOnceWith(true);
  }));

  it('isFormValid should return true when tfrDetails and clientGroup are valid', () => {
    component.tfrDetails = new FormGroup({ a: new FormControl() });
    expect(component.tfrDetails.valid).toBeTruthy();
    component.clientGroup = new FormGroup({ a: new FormControl() });
    expect(component.clientGroup.valid).toBeTruthy();
    expect(component.isFormValid()).toBeTruthy();
  });

  it('isFormValid should return false when tfrDetails not valid', () => {
    component.tfrDetails = new FormGroup({
      a: new FormControl('', [Validators.required]),
    });
    expect(component.tfrDetails.valid).toBeFalsy();
    component.clientGroup = new FormGroup({ a: new FormControl() });
    expect(component.clientGroup.valid).toBeTruthy();
    expect(component.isFormValid()).toBeFalsy();
  });

  it('isFormValid should return false when clientGroup not valid', () => {
    component.tfrDetails = new FormGroup({ a: new FormControl() });
    expect(component.tfrDetails.valid).toBeTruthy();
    component.clientGroup = new FormGroup({
      a: new FormControl('', [Validators.required]),
    });
    expect(component.clientGroup.valid).toBeFalsy();
    expect(component.isFormValid()).toBeFalsy();
  });

  it('isFormValid should return false when clientGroup is undefined', () => {
    component.tfrDetails = new FormGroup({ a: new FormControl() });
    expect(component.tfrDetails.valid).toBeTruthy();
    expect(component.clientGroup).toBeUndefined();
    expect(component.isFormValid()).toBeFalsy();
  });

  it('isFormDirty should return true when clientGroup is dirty', () => {
    component.tfrDetails = new FormGroup({ a: new FormControl() });
    expect(component.tfrDetails.dirty).toBeFalsy();

    component.clientGroup = new FormGroup({ a: new FormControl() });
    component.clientGroup.markAsDirty();
    expect(component.clientGroup.dirty).toBeTruthy();

    expect(component.isFormDirty()).toBeTruthy();
  });

  it('isFormDirty should return true when tfrDetails is dirty', () => {
    component.clientGroup = new FormGroup({ a: new FormControl() });
    expect(component.clientGroup.dirty).toBeFalsy();

    component.tfrDetails = new FormGroup({ a: new FormControl() });
    component.tfrDetails.markAsDirty();
    expect(component.tfrDetails.dirty).toBeTruthy();

    expect(component.isFormDirty()).toBeTruthy();
  });

  it('isFormDirty should return false when isFormValid is false', () => {
    component.tfrDetails = new FormGroup({ a: new FormControl() });
    component.tfrDetails.markAsDirty();
    expect(component.tfrDetails.dirty).toBeTruthy();
    component.clientGroup = new FormGroup({
      a: new FormControl('', [Validators.required]),
    });
    component.clientGroup.markAsDirty();
    expect(component.clientGroup.dirty).toBeTruthy();
    expect(component.isFormValid()).toBeFalsy();

    expect(component.isFormDirty()).toBeFalsy();
  });

  it('isFormDirty should return false when both tfrDetails and clientGroup are not dirty', () => {
    component.clientGroup = new FormGroup({ a: new FormControl() });
    expect(component.clientGroup.dirty).toBeFalsy();

    component.tfrDetails = new FormGroup({ a: new FormControl() });
    expect(component.tfrDetails.dirty).toBeFalsy();

    expect(component.isFormDirty()).toBeFalsy();
  });

  it('saveTFR should call setBasicDetails with correct details and status as draft if not in edit mode', () => {
    const editModeVal = false;
    const previousSuccessVal = false;

    tfrManagerSpy.setBasicDetails.and.returnValue(of(true));
    component.clientGroup = new FormGroup({ a: new FormControl() });

    component.tfrDetails
      .get('name')
      ?.setValue(DummyProjectBasicDetailsInProgress.name);
    component.tfrDetails
      .get('start_date')
      ?.setValue(DummyProjectBasicDetailsInProgress.start_date);
    component.tfrDetails
      .get('end_date')
      ?.setValue(DummyProjectBasicDetailsInProgress.end_date);
    component.tfrDetails
      .get('client_id')
      ?.setValue(DummyProjectBasicDetailsInProgress.client_id);
    component.client_specificData =
      DummyProjectBasicDetailsInProgress.client_specific;

    component.editMode = editModeVal;

    component.saveTFR();

    expect(tfrManagerSpy.setBasicDetails).toHaveBeenCalledOnceWith(
      DummyProjectBasicDetailsDraft,
      previousSuccessVal
    );
  });

  it('saveTFR should call setBasicDetails with correct details and status if in edit mode', () => {
    const editModeVal = true;
    const previousSuccessVal = true;

    tfrManagerSpy.setBasicDetails.and.returnValue(of(true));
    component.clientGroup = new FormGroup({ a: new FormControl() });

    component.tfrDetails
      .get('name')
      ?.setValue(DummyProjectBasicDetailsInProgress.name);
    component.tfrDetails
      .get('start_date')
      ?.setValue(DummyProjectBasicDetailsInProgress.start_date);
    component.tfrDetails
      .get('end_date')
      ?.setValue(DummyProjectBasicDetailsInProgress.end_date);
    component.tfrDetails
      .get('client_id')
      ?.setValue(DummyProjectBasicDetailsInProgress.client_id);
    component.client_specificData =
      DummyProjectBasicDetailsInProgress.client_specific;
    component.projectToEdit = DummyProjectBasicDetailsInProgress;

    component.editMode = editModeVal;
    component.previousUpdateSuccessful = previousSuccessVal;

    component.saveTFR();

    expect(tfrManagerSpy.setBasicDetails).toHaveBeenCalledOnceWith(
      DummyProjectBasicDetailsInProgress,
      previousSuccessVal
    );
  });

  it('saveTFR should mark formGroups as pristine if setBasicDetails returns true', () => {
    const editModeVal = false;

    tfrManagerSpy.setBasicDetails.and.returnValue(of(true));
    component.clientGroup = new FormGroup({ a: new FormControl() });

    component.editMode = editModeVal;

    component.tfrDetails.markAsDirty();
    expect(component.tfrDetails.dirty).toBeTruthy();

    component.clientGroup.markAsDirty();
    expect(component.clientGroup.dirty).toBeTruthy();

    component.saveTFR();

    expect(component.tfrDetails.dirty).toBeFalsy();
    expect(component.clientGroup.dirty).toBeFalsy();
  });

  it('saveTFR should not mark formGroups as pristine and emit stepComplete false if setBasicDetails returns false', () => {
    const editModeVal = false;

    spyOn(component.stepCompletedEmitter, 'emit');
    tfrManagerSpy.setBasicDetails.and.returnValue(of(false));
    component.clientGroup = new FormGroup({ a: new FormControl() });

    component.editMode = editModeVal;

    component.tfrDetails.markAsDirty();
    expect(component.tfrDetails.dirty).toBeTruthy();

    component.clientGroup.markAsDirty();
    expect(component.clientGroup.dirty).toBeTruthy();

    component.saveTFR();

    expect(component.tfrDetails.dirty).toBeTruthy();
    expect(component.clientGroup.dirty).toBeTruthy();
    expect(component.stepCompletedEmitter.emit).toHaveBeenCalledOnceWith(false);
  });

  it('onClientSelected should set client_id correctly', () => {
    component.onClientSelect(DummyClients[0]);
    expect(component.tfrDetails.get('client_id')?.value).toEqual(
      DummyClients[0].id
    );
  });

  it('next() should call unsavedChanges response if isFormDirty is true', () => {
    spyOn(component, 'isFormDirty').and.returnValue(true);

    component.next();

    expect(responseHandlerSpy.unsavedChangesDialogue).toHaveBeenCalledTimes(1);
  });

  it('next() should emit stepCompleted and nextStep if isFormDirty is false', () => {
    spyOn(component, 'isFormDirty').and.returnValue(false);
    spyOn(component.nextStepEmitter, 'emit');
    spyOn(component.stepCompletedEmitter, 'emit');

    component.next();

    expect(component.nextStepEmitter.emit).toHaveBeenCalledOnceWith(true);
    expect(component.stepCompletedEmitter.emit).toHaveBeenCalledOnceWith(true);
  });

  it('resetInputFields() should call getFromDatabase with correct arguments', () => {
    const id = 1;
    (tfrManagerSpy as any).getProjectId = id;

    tfrManagerSpy.getFromDatabase.and.returnValue(of(DummyProjectResponseOk));

    spyOn(component.getProjectObserver, 'next').and.stub();

    component.resetInputFields();

    expect(tfrManagerSpy.getFromDatabase).toHaveBeenCalledOnceWith(id);
  });

  it('getProjectObserver should call next with correct arguments if response from database is valid', () => {
    const id = 1;
    (tfrManagerSpy as any).getProjectId = id;

    tfrManagerSpy.getFromDatabase.and.returnValue(of(DummyProjectResponseOk));

    spyOn(component.getProjectObserver, 'next').and.stub();

    component.resetInputFields();

    expect(component.getProjectObserver.next).toHaveBeenCalledOnceWith(
      DummyProjectResponseOk
    );
  });

  it('getProjectObserver.next should work', () => {
    (tfrManagerSpy as any).project = DummyProject;
    component.clientGroup = new FormGroup({ a: new FormControl() });
    component.clientGroup.markAsDirty();
    expect(component.clientGroup.dirty).toBeTruthy();
    expect(component.projectToEdit).toBeUndefined();

    component.getProjectObserver.next(DummyProjectResponseOk);

    expect(tfrManagerSpy.extractProject).toHaveBeenCalledOnceWith(
      DummyProjectResponseOk
    );
    expect(component.clientGroup.dirty).toBeFalsy();
    expect(component.tfrDetails.dirty).toBeFalsy();
    expect(tfrManagerSpy.resetClientDetails).toHaveBeenCalledTimes(1);
    expect(component.projectToEdit).toBeUndefined();
    expect(component.tfrDetails.get('name')?.value).toEqual(DummyProject.name);
    expect(component.tfrDetails.get('start_date')?.value).toEqual(
      DummyProject.start_date
    );
    expect(component.tfrDetails.get('end_date')?.value).toEqual(
      DummyProject.end_date
    );
  });

  it('getProjectObserver.next should set projectToEdit clientId is projectToEdit is defined', () => {
    (tfrManagerSpy as any).project = DummyProject;
    spyOn(component.getProjectObserver, 'next').and.callThrough();
    component.clientGroup = new FormGroup({ a: new FormControl() });

    component.projectToEdit = DummyProject2;

    component.getProjectObserver.next(DummyProjectResponseOk);

    expect(component.getProjectObserver.next).toHaveBeenCalledOnceWith(
      DummyProjectResponseOk
    );
    expect(component.projectToEdit.client_id).toEqual(DummyProject.client_id);
  });

  it('getProjectObserver should call error if getFromDatabase returns an error', () => {
    const id = 1;
    (tfrManagerSpy as any).getProjectId = id;

    tfrManagerSpy.getFromDatabase.and.returnValue(
      throwError(() => {
        new Error();
      })
    );

    spyOn(component.getProjectObserver, 'error').and.stub();

    component.resetInputFields();

    expect(component.getProjectObserver.error).toHaveBeenCalledTimes(1);
  });

  it('getProjectObserver.error should emit stepCompleted false if error status is not 400', () => {
    spyOn(component.stepCompletedEmitter, 'emit');

    component.getProjectObserver.error(DummyError0);

    expect(component.stepCompletedEmitter.emit).toHaveBeenCalledOnceWith(false);
  });

  it('getProjectObserver.error should emit stepCompleted false if error status is 400', () => {
    spyOn(component.stepCompletedEmitter, 'emit');

    component.getProjectObserver.error(DummyError400);

    expect(component.stepCompletedEmitter.emit).toHaveBeenCalledOnceWith(false);
  });

  it('getProjectObserver.error should reset tfrDetails details if response status is 400', () => {
    component.tfrDetails
      .get('name')
      ?.setValue(DummyProjectBasicDetailsInProgress.name);
    component.tfrDetails
      .get('start_date')
      ?.setValue(DummyProjectBasicDetailsInProgress.start_date);
    component.tfrDetails
      .get('end_date')
      ?.setValue(DummyProjectBasicDetailsInProgress.end_date);
    component.tfrDetails
      .get('client_id')
      ?.setValue(DummyProjectBasicDetailsInProgress.client_id);
    component.tfrDetails.markAsDirty();
    expect(component.tfrDetails.dirty).toBeTruthy();

    expect(component.tfrDetails.get('name')?.value).toBeTruthy();
    expect(component.tfrDetails.get('start_date')?.value).toBeTruthy();
    expect(component.tfrDetails.get('end_date')?.value).toBeTruthy();
    expect(component.tfrDetails.get('client_id')?.value).toBeTruthy();

    component.getProjectObserver.error(DummyError400);

    expect(component.tfrDetails.get('name')?.value).toBeNull();
    expect(component.tfrDetails.get('start_date')?.value).toBeNull();
    expect(component.tfrDetails.get('end_date')?.value).toBeNull();
    expect(component.tfrDetails.get('client_id')?.value).toBeNull();

    expect(component.tfrDetails.dirty).toBeFalsy();
  });

  it('getProjectObserver.error should reset clientGroup if error status is 400 and clientGroup is defined', () => {
    component.clientGroup = new FormGroup({ a: new FormControl() });
    component.clientGroup.markAsDirty();
    expect(component.clientGroup.dirty).toBeTruthy();

    component.getProjectObserver.error(DummyError400);

    expect(component.clientGroup.dirty).toBeFalsy();
    expect(tfrManagerSpy.resetClientDetails).toHaveBeenCalledTimes(1);
  });

  it('getProjectObserver.error should call responseHandler if error status is not 400', () => {
    component.getProjectObserver.error(DummyError0);

    expect(responseHandlerSpy.badGet).toHaveBeenCalledTimes(1);
  });

  it('onAttributesUpdated should update clientInfo', () => {
    spyOn(component, 'updateClient_specific').and.stub();
    const group = new FormGroup({ control1: new FormControl() });
    expect(component.clientGroup).toBeUndefined();

    component.onAttributesUpdated(group);

    expect(component.clientGroup).toEqual(group);
    expect(component.updateClient_specific).toHaveBeenCalledTimes(1);
  });

  it('updateClient_soecific should update client_specific to be empty if clientGroup is invalid', () => {
    const specificData = { name: 'test' };

    component.clientGroup = new FormGroup({
      a: new FormControl('', [Validators.required]),
    });
    expect(component.clientGroup.valid).toBeFalsy();
    component.client_specificData = specificData;
    expect(component.client_specificData).toEqual(specificData);

    component.updateClient_specific();

    expect(component.client_specificData).toEqual({});
  });

  it('updateClient_specific should update client_specific to be set correctly if clientGroup is valid', () => {
    const values = ['value1', 'value2', 'value3'];
    const dummyAttributeNames = ['attribute1', 'attribute2', 'attribute3'];
    const correctSpecifcData = {
      attribute1: 'value1',
      attribute2: 'value2',
      attribute3: 'value3',
    };

    component.clientGroup = new FormGroup({
      attributeValues: new FormArray([
        new FormControl(values[0]),
        new FormControl(values[1]),
        new FormControl(values[2]),
      ]),
    });
    expect(component.clientGroup.valid).toBeTruthy();
    expect(component.client_specificData).toEqual({});
    component.attributeNames = dummyAttributeNames;

    component.updateClient_specific();

    expect(component.client_specificData).toEqual(correctSpecifcData);
  });
});
