import { TestBed } from '@angular/core/testing';

import { UserDataJwtService } from './user-data-jwt.service';

describe('UserDataJwtService', () => {
  let service: UserDataJwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDataJwtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
