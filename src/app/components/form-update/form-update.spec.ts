import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdate } from './form-update';

describe('FormUpdate', () => {
  let component: FormUpdate;
  let fixture: ComponentFixture<FormUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormUpdate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


