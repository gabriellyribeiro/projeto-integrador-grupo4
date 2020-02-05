import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarVendedorComponent } from './registrar-vendedor.component';

describe('RegistrarVendedorComponent', () => {
  let component: RegistrarVendedorComponent;
  let fixture: ComponentFixture<RegistrarVendedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarVendedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
