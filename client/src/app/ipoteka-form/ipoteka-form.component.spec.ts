import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpotekaFormComponent } from './ipoteka-form.component';

describe('IpotekaFormComponent', () => {
  let component: IpotekaFormComponent;
  let fixture: ComponentFixture<IpotekaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpotekaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpotekaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
