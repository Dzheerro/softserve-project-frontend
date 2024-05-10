import { TestBed } from '@angular/core/testing';

import { ShowTrackService } from './actions.service';

describe('ShowTrackService', () => {
  let service: ShowTrackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowTrackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
