import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLatComponent } from './navbar-lat.component';

describe('NavbarLatComponent', () => {
  let component: NavbarLatComponent;
  let fixture: ComponentFixture<NavbarLatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarLatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarLatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
