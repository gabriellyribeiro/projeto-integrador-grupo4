import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendedorPageComponent } from './vendedor-page.component';

describe('VendedorPageComponent', () => {
  let component: VendedorPageComponent;
  let fixture: ComponentFixture<VendedorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendedorPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendedorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
