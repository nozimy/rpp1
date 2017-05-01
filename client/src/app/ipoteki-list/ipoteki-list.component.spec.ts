import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpotekiListComponent } from './ipoteki-list.component';

describe('IpotekiListComponent', () => {
  let component: IpotekiListComponent;
  let fixture: ComponentFixture<IpotekiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpotekiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpotekiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
