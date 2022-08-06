import { TestBed } from '@angular/core/testing';

import { SubCategoreisService } from './sub-categoreis.service';

describe('SubCategoreisService', () => {
  let service: SubCategoreisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubCategoreisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
