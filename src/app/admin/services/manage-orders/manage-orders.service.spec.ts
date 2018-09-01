import { TestBed, inject } from '@angular/core/testing';

import { ManageOrdersService } from './manage-orders.service';

describe('ManageOrdersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManageOrdersService]
    });
  });

  it('should be created', inject([ManageOrdersService], (service: ManageOrdersService) => {
    expect(service).toBeTruthy();
  }));
});
