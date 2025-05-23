import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchermataInizialeComponent } from './schermata-iniziale.component';

describe('SchermataInizialeComponent', () => {
  let component: SchermataInizialeComponent;
  let fixture: ComponentFixture<SchermataInizialeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchermataInizialeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchermataInizialeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
