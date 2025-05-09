import { TestBed } from '@angular/core/testing';

import { ListaSpesaService } from './lista-spesa.service';

describe('ListaSpesaService', () => {
  let service: ListaSpesaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaSpesaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
