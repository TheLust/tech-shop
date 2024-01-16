import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyValueDialogComponent } from './key-value-dialog.component';

describe('KeyValueDialogComponent', () => {
  let component: KeyValueDialogComponent;
  let fixture: ComponentFixture<KeyValueDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyValueDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KeyValueDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
