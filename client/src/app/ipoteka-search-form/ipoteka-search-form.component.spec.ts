import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpotekaSearchFormComponent } from './ipoteka-search-form.component';

describe('IpotekaSearchFormComponent', () => {
  let component: IpotekaSearchFormComponent;
  let fixture: ComponentFixture<IpotekaSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpotekaSearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpotekaSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
