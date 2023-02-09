import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { TfrCreationDialogComponent } from 'src/app/components/tfr-creation-dialog/tfr-creation-dialog.component';
import {
  DummyError400,
  DummyError412,
  DummyError500,
} from 'src/app/types/dummy-data';
import { SnackBarService } from '../snack-bar/snack-bar.service';
import { ResponseHandlerService } from './response-handler.service';

export class MatDialogMock {
  open(component: TfrCreationDialogComponent) {
    return {
      afterClosed: () => of('true'),
    };
  }
}

describe('ResponseHandlerService', () => {
  let service: ResponseHandlerService;
  let dialogSpy: jasmine.Spy;
  let dialogRefSpyObj = jasmine.createSpyObj({
    afterClosed: of({}),
    close: null,
  });
  let snackBarServiceSpy: jasmine.SpyObj<SnackBarService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MatDialog,
          useClass: MatDialogMock,
        },
        {
          provide: SnackBarService,
          useValue: jasmine.createSpyObj('SnackBarService', ['showSnackBar']),
        },
      ],
    });
    snackBarServiceSpy = TestBed.inject(
      SnackBarService
    ) as jasmine.SpyObj<SnackBarService>;
    dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue({
      afterClosed: () => of('true'),
    } as MatDialogRef<TfrCreationDialogComponent>);
    service = TestBed.inject(ResponseHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should display expected msgs in snackBar', () => {
    service.badGet();
    expect(snackBarServiceSpy.showSnackBar)
      .withContext('Bad Get msg')
      .toHaveBeenCalledWith('Error. Try again', 5000);
    service.badSave();
    expect(snackBarServiceSpy.showSnackBar)
      .withContext('Bad Save msg')
      .toHaveBeenCalledWith('Save Unsuccessful. Try again', 5000);
    service.goodSave();
    expect(snackBarServiceSpy.showSnackBar)
      .withContext('Good Save msg')
      .toHaveBeenCalledWith('Saved to database', 3000);
    service.goodRegister();
    expect(snackBarServiceSpy.showSnackBar)
      .withContext('Good Register msg')
      .toHaveBeenCalledWith('Successfully registered', 3000);
    service.badRequest();
    expect(snackBarServiceSpy.showSnackBar)
      .withContext('Bad Request msg')
      .toHaveBeenCalledWith('Bad request. Try again', 5000);
  });

  it('should handle bad project update - 400 error', () => {
    let err: HttpErrorResponse = DummyError400;
    spyOn(service, 'badRequest');
    service.handleBadProjectUpdate(err);
    expect(service.badRequest).toHaveBeenCalled();
  });

  it('should handle bad project update - 500 error', () => {
    let err: HttpErrorResponse = DummyError500;
    spyOn(service, 'badSave');
    service.handleBadProjectUpdate(err);
    expect(service.badSave).toHaveBeenCalled();
  });

  it('should handle bad project update - 412 error', () => {
    let err: HttpErrorResponse = DummyError412;
    spyOn(service, 'outOfDateProject');
    service.handleBadProjectUpdate(err);
    expect(service.outOfDateProject).toHaveBeenCalled();
  });

  it('should reload page - wrong project version', () => {
    service.reloadPage = function () {};
    spyOn(service, 'reloadPage');
    service.outOfDateProject();
    expect(service.reloadPage).toHaveBeenCalled();
  });

  it('should open dialog for unsaved changes', () => {
    service.unsavedChangesDialogue();
    expect(dialogSpy).toHaveBeenCalledWith(TfrCreationDialogComponent, {
      data: {
        title: 'Unsaved Changes',
        content: 'Save or reset before moving on',
        confirmText: 'OK',
        cancelText: '',
      },
    });
  });
});
