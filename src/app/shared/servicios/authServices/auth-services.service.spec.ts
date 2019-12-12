import { TestBed } from '@angular/core/testing';

import { AuthServicesService } from './auth-services.service';

describe('AuthServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthServicesService = TestBed.get(AuthServicesService);
    expect(service).toBeTruthy();
  });
});
