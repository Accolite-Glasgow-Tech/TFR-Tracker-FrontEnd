import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TfrCreationDialogComponent } from './tfr-creation-dialog.component';

fdescribe('TfrCreationDialogComponent', () => {
  let component: TfrCreationDialogComponent;
  let fixture: ComponentFixture<TfrCreationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TfrCreationDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TfrCreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
