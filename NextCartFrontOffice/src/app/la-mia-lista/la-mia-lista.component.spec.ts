import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaMiaListaComponent } from './la-mia-lista.component';

describe('LaMiaListaComponent', () => {
  let component: LaMiaListaComponent;
  let fixture: ComponentFixture<LaMiaListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaMiaListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaMiaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
