import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateResourceDialogComponent } from './update-resource-dialog.component';

describe('UpdateResourceDialogComponent', () => {
  let component: UpdateResourceDialogComponent;
  let fixture: ComponentFixture<UpdateResourceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateResourceDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateResourceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
