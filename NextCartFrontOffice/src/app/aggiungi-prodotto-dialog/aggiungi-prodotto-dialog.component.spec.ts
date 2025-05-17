import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungiProdottoDialogComponent } from './aggiungi-prodotto-dialog.component';

describe('AggiungiProdottoDialogComponent', () => {
  let component: AggiungiProdottoDialogComponent;
  let fixture: ComponentFixture<AggiungiProdottoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AggiungiProdottoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AggiungiProdottoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
