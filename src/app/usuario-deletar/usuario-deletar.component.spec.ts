import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioDeletarComponent } from './usuario-deletar.component';

describe('UsuarioDeletarComponent', () => {
  let component: UsuarioDeletarComponent;
  let fixture: ComponentFixture<UsuarioDeletarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioDeletarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioDeletarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
