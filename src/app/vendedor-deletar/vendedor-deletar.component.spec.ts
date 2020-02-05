import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendedorDeletarComponent } from './vendedor-deletar.component';

describe('VendedorDeletarComponent', () => {
  let component: VendedorDeletarComponent;
  let fixture: ComponentFixture<VendedorDeletarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendedorDeletarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendedorDeletarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
