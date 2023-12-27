import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaptopCrudComponent } from './laptop-crud.component';

describe('LaptopCrudComponent', () => {
  let component: LaptopCrudComponent;
  let fixture: ComponentFixture<LaptopCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaptopCrudComponent]
    });
    fixture = TestBed.createComponent(LaptopCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
