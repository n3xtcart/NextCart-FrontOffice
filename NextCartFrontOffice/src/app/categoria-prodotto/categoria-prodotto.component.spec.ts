import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaProdottoComponent } from './categoria-prodotto.component';

describe('CategoriaProdottoComponent', () => {
  let component: CategoriaProdottoComponent;
  let fixture: ComponentFixture<CategoriaProdottoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriaProdottoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaProdottoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
