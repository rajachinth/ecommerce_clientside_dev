import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyorderFormComponent } from './myorder-form.component';

describe('MyorderFormComponent', () => {
  let component: MyorderFormComponent;
  let fixture: ComponentFixture<MyorderFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyorderFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyorderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
