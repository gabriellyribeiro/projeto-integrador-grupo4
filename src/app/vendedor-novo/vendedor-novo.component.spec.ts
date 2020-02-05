import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendedorNovoComponent } from './vendedor-novo.component';

describe('VendedorNovoComponent', () => {
  let component: VendedorNovoComponent;
  let fixture: ComponentFixture<VendedorNovoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendedorNovoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendedorNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
