import { TestBed } from '@angular/core/testing';

import { ListarOfertasService } from './listar-ofertas.service';

describe('ListarOfertasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListarOfertasService = TestBed.get(ListarOfertasService);
    expect(service).toBeTruthy();
  });
});
