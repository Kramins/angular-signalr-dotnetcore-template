import { TestBed, inject } from '@angular/core/testing';

import { DataHubService } from './data-hub.service';

describe('DataHubService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataHubService]
    });
  });

  it('should be created', inject([DataHubService], (service: DataHubService) => {
    expect(service).toBeTruthy();
  }));
});
