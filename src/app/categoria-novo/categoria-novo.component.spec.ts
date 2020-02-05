import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaNovoComponent } from './categoria-novo.component';

describe('CategoriaNovoComponent', () => {
  let component: CategoriaNovoComponent;
  let fixture: ComponentFixture<CategoriaNovoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaNovoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
