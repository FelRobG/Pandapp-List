import { TestBed } from '@angular/core/testing';
import { DbRest } from './db-rest';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DbRest', () => {
  let service: DbRest;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DbRest]
    });
    service = TestBed.inject(DbRest);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});