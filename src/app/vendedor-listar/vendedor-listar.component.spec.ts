import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendedorListarComponent } from './vendedor-listar.component';

describe('VendedorListarComponent', () => {
  let component: VendedorListarComponent;
  let fixture: ComponentFixture<VendedorListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendedorListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendedorListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
