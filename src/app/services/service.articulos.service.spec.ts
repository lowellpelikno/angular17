import { TestBed } from '@angular/core/testing';

import { ServiceArticulosService } from './service.articulos.service';

describe('ServiceArticulosService', () => {
  let service: ServiceArticulosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceArticulosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
