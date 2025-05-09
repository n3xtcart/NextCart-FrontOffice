import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieProdottoComponent } from './categorie-prodotto.component';

describe('CategorieProdottoComponent', () => {
  let component: CategorieProdottoComponent;
  let fixture: ComponentFixture<CategorieProdottoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorieProdottoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorieProdottoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
