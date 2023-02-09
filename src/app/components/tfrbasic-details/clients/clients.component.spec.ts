import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';
import { DummyClients, DummyError0 } from 'src/app/types/dummy-data';
import { ClientsComponent } from './clients.component';

fdescribe('ClientsComponent', () => {
  let component: ClientsComponent;
  let fixture: ComponentFixture<ClientsComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let tfrManagementServiceSpy: jasmine.SpyObj<TfrManagementService>;

  beforeEach(async () => {
    const apiSpy = jasmine.createSpyObj('ApiService', {
      getClients: of([]),
      getAllClientAttributes: of([]),
    });
    const tfrManagementSpy = jasmine.createSpyObj(
      'TfrManagementService',
      ['getBasicDetails'],
      {
        clientReset: new EventEmitter<boolean>(),
        serverDown: false,
      }
    );
    await TestBed.configureTestingModule({
      declarations: [ClientsComponent],
      imports: [HttpClientTestingModule, MatSnackBarModule, MatDialogModule],
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
    //TODO...
  });
});
