import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardlistComponent } from './product-cardlist.component';

describe('ProductCardlistComponent', () => {
  let component: ProductCardlistComponent;
  let fixture: ComponentFixture<ProductCardlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCardlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
