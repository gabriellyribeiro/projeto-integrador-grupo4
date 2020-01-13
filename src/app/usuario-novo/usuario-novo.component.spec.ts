import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioNovoComponent } from './usuario-novo.component';

describe('UsuarioNovoComponent', () => {
  let component: UsuarioNovoComponent;
  let fixture: ComponentFixture<UsuarioNovoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioNovoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
