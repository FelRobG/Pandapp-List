import { TestBed } from '@angular/core/testing';
import { DbTaskService } from './db-task';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { Storage } from '@ionic/storage-angular';

describe('DbTaskService', () => {
  let service: DbTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DbTaskService,
        { provide: SQLite, useValue: {} },
        { provide: Storage, useValue: { create: () => Promise.resolve(), get: () => Promise.resolve(null), set: () => Promise.resolve(), remove: () => Promise.resolve() } }
      ]
    });
    service = TestBed.inject(DbTaskService);
  });

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });
});