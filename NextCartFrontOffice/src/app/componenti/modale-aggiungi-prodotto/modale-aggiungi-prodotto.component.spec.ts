import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaleAggiungiProdottoComponent } from './modale-aggiungi-prodotto.component';

describe('ModaleAggiungiProdottoComponent', () => {
  let component: ModaleAggiungiProdottoComponent;
  let fixture: ComponentFixture<ModaleAggiungiProdottoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModaleAggiungiProdottoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaleAggiungiProdottoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
