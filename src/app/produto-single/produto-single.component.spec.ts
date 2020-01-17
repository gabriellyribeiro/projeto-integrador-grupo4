import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoSingleComponent } from './produto-single.component';

describe('ProdutoSingleComponent', () => {
  let component: ProdutoSingleComponent;
  let fixture: ComponentFixture<ProdutoSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutoSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
