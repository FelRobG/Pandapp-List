import { TestBed } from '@angular/core/testing';

import { DbRest } from './db-rest';

describe('DbRest', () => {
  let service: DbRest;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbRest);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
